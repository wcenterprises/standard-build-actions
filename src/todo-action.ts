import * as core from '@actions/core'
import { IEnvironment } from './interfaces/environment'
import { loadEnvironment } from './helpers/cache-utils'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    core.debug('Entering todo-action')

    const env: IEnvironment = loadEnvironment(process.env['sba.environment'] as string)
    core.warning('TODO: This action is not yet implemented.')

    console.log(env)

  } catch (error) {
    // Fail the workflow run if an error occurs
    /* istanbul ignore next */
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
