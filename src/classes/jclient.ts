
import JiraApi,* as jira from 'jira-client'
import * as ch from '../helpers/content-helpers'

import { CreateIssueOptions, IJiraIssue } from 'src/interfaces/jira'

export class JiraClient {

  private _api: JiraApi
  
  constructor(host: string, username: string, password: string) {
    this._api = new JiraApi({      
        protocol: 'https',
        host: `${host}`,
        username: `${username}`,
        password: `${password}`,
        apiVersion: '3',
        strictSSL: true
    })
  }

  async getIssue(key: string): Promise<IJiraIssue> {
    return await this._api.findIssue(key, undefined, 'key,summary,status') as IJiraIssue
  }

  async createIssue(key: string, summary: string, options?: CreateIssueOptions): Promise<string | undefined > {
    console.log(`markdown: ${options?.markdown}`)
    const adf = options?.markdown ? ch.translateMarkdown(String(options?.markdown)) : null
    console.log(`adf: ${adf}`)

    const result: jira.IssueObject = await this._api.addNewIssue(
      {
        fields: {
          issuetype: { name: "Task" },
          project: { key: `${key}` },
          summary: `${summary}`,
          description: adf
        }
    })
    return result?.key as string
  }
}