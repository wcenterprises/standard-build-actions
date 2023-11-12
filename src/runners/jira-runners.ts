import * as core from '@actions/core'

// 'https://wcenterprises.atlassian.net/rest/api/3/issue/<ticket number>?fields=project,summary,issuetype'

// https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/
// https://blog.logrocket.com/5-ways-to-make-http-requests-in-node-js/



import {JiraClient} from '../classes/jclient'
import { IJiraIssue } from 'src/interfaces/jira'

const jira: JiraClient = new JiraClient(`${process.env.JIRA_HOST}`, `${process.env.JIRA_USERNAME}`, `${process.env.JIRA_PASSWORD}`)

export async function getIssueCommand(key: string): Promise<IJiraIssue> {
  return await jira.getIssue(key)
}
