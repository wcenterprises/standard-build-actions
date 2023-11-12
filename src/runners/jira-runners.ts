import * as core from '@actions/core'
import * as ch from '../helpers/content-helpers'

// 'https://wcenterprises.atlassian.net/rest/api/3/issue/<ticket number>?fields=project,summary,issuetype'

// https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/
// https://blog.logrocket.com/5-ways-to-make-http-requests-in-node-js/



import {JiraClient} from '../classes/jclient'
import { CreateIssueOptions, IJiraIssue } from 'src/interfaces/jira'

const jira: JiraClient = new JiraClient(`${process.env.JIRA_HOST}`, `${process.env.JIRA_USERNAME}`, `${process.env.JIRA_PASSWORD}`)

export async function getIssueCommand(key: string): Promise<IJiraIssue> {
  return await jira.getIssue(key)
}

export async function createIssueCommand(key: string, summary: string, options?: CreateIssueOptions ) {
  
  if (options?.markdown){
      return await jira.createIssue(key, summary, { 
        markdown: options?.markdown + ch.readFileContentSync(__dirname + '../../_template/ISSUE_BODY_TEMPLATE.md') 
      })
  }

  return await jira.createIssue(key, summary)
}
