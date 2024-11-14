import * as core from '@actions/core'
import * as github from "@actions/github"

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
    console.log(github.context)
    const env: IEnvironment = buildEnvironment()
    const tempFile: string = getTempFile(`${env.directories.temp}`)
    saveEnvironment(tempFile, env)
    core.exportVariable('sba.environment', tempFile)

    core.setOutput('staging-directory', env.directories.staging)
    core.setOutput('output-directory', env.directories.output)
    core.setOutput('artifact-directory', env.directories.artifacts)
    core.setOutput('package-directory', env.directories.package)
    

  } catch (error) {
    // Fail the workflow run if an error occurs
    /* istanbul ignore next */
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
