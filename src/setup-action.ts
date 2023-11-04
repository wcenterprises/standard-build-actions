import * as core from '@actions/core'

import { IEnvironment } from './interfaces/environment'
import { loadEnvironment, saveEnvironment } from './helpers/cache-utils'
import { buildEnvironment } from './helpers/environment-helpers'
import { getTempFile } from './helpers/utility'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    core.debug('Entering setup-action')
    const env: IEnvironment = buildEnvironment()
    const tempFile: string = getTempFile(`${env.directories.temp}`)
    saveEnvironment(tempFile, env)
    core.exportVariable('sba.environment', tempFile)
    console.log(env)
    
  } catch (error) {
    // Fail the workflow run if an error occurs
    /* istanbul ignore next */
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
