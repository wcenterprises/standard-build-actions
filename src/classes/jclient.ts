
import JiraApi from 'jira-client'

import { IJiraIssue } from 'src/interfaces/jira'

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
}