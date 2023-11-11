import * as core from '@actions/core'

// 'https://wcenterprises.atlassian.net/rest/api/3/issue/<ticket number>?fields=project,summary,issuetype'

// https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/
// https://blog.logrocket.com/5-ways-to-make-http-requests-in-node-js/



import {JiraClient} from '../classes/jclient'

const jira: JiraClient = new JiraClient('host', 'username', 'password')

export async function runJiraCommand(command: string): Promise<void> {
  console.log(await jira.getIssue('TDA-1'))
}