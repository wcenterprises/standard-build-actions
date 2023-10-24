import * as core from '@actions/core'
import * as toolrunner from '@actions/exec/lib/toolrunner'
import * as safeWhich from '@chrisgavin/safe-which'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {

    console.log('TODO: Implement')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()