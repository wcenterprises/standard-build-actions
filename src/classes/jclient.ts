
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

    const adf = options?.markdown ? null : ch.translateMarkdown(String(options?.markdown))

    const result: jira.IssueObject = await this._api.addNewIssue(
      {
        fields: {
          issueType: { name: "Task" },
          project: { key: key },
          summary: summary,
          description: adf
        }
    })
    return result?.key as string
  }
}