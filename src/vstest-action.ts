import * as os from 'os'
import * as core from '@actions/core'
import { getVstestPath } from './helpers/action-util'
import { UserError } from './helpers/utility'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    if (os.platform() === 'win32') {
      throw new UserError('This action can only be executed on Windows.')
    }
    console.log(await getVstestPath())
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()
