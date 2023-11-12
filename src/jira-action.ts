import * as core from '@actions/core'
import { createIssueCommand, getIssueCommand } from './runners/jira-runners'
import { IJiraIssue } from './interfaces/jira'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(command: string): Promise<void> {
  try {
    core.debug('Entering jira-action')

    switch (command) {
      case 'create': {
        const key: string = await createIssueCommand(core.getInput('key', { required: true })) as string
        core.setOutput('issue-key', key)
        return 
      }
      case 'get': {
        const issue: IJiraIssue = await getIssueCommand(core.getInput('key', { required: true }))
        core.setOutput('issue-key', issue.key)
        core.setOutput('issue-data', JSON.stringify(issue))
        return
      }
      case 'command': {
        return
      }
    }

  } catch (error) {
    // Fail the workflow run if an error occurs
    /* istanbul ignore next */
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run(core.getInput('command'))
