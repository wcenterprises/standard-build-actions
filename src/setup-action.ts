import * as core from '@actions/core'

import { ActionEnvironment } from './helpers/environment'



/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const isRequired = { required: true }
    const notRequired = { required: false }
    const env: ActionEnvironment = new ActionEnvironment()

    console.log(`environment: ${JSON.stringify(env)}`)

    const repo: string = core.getInput('repository', isRequired)
    const token: string = core.getInput('token', isRequired)
    const configFile: string = core.getInput('config-file', notRequired)

    core.debug(`repository: ${repo}`)
    core.debug(`token: ${token}`)
    core.debug(`config-file: ${configFile}`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
