import * as core from '@actions/core'

import { glob } from 'glob'
import { getDotnetVersion } from './helpers/dotnet-helpers'
import { runRestoreCommand, runBuildCommand, runPublishCommand, runPackCommand } from './helpers/dotnet-runners'


/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(command: string): Promise<void> {
  try {
    core.debug('Entering dotnet-action')
    core.debug(`dotnet version: ${await getDotnetVersion()}`)

    const projects: string[] = await glob(core.getInput('projects', {required: true}))

    switch (command) {
      case 'restore': {
        return await runRestoreCommand(projects)
      }
      case 'build': {
        return await runBuildCommand(projects)
      }
      case 'publish': {
        return await runPublishCommand(projects)
      }
      case 'pack': {
        return await runPackCommand(projects)
      }
      default: {
        throw new Error(`dotnet command '${command}' not implemented!`)
      }
    }    
  } catch (error) {
    // Fail the workflow run if an error occurs
    /* istanbul ignore next */
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run(core.getInput('command', { required: true }))
