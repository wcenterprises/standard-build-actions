import * as core from '@actions/core'
import { runJiraCommand } from './runners/jira-runners'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(command: string): Promise<void> {
  try {
    core.debug('Entering jira-action')

    switch (command) {
      case 'create': {
        return
      }
      case 'get': {
        runJiraCommand('')
      }
      case 'update': {
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
