import * as core from '@actions/core'

import { ActionEnvironment } from './helpers/environment'
import { TimeStamp } from './helpers/version-helpers'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const env: ActionEnvironment = new ActionEnvironment(TimeStamp)
    core.exportVariable('ACTION_ENVIRONMENT', JSON.stringify(env))
    
    console.log(env)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()
