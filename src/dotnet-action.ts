import * as core from '@actions/core'
import { IEnvironment } from './interfaces/environment'
import { loadEnvironment } from './helpers/cache-utils'
import { safeWhich } from '@chrisgavin/safe-which'
import { getDotnetVersion } from './helpers/dotnet-helpers'
import { runRestoreCommand, runBuildCommand, runPublishCommand, runPackCommand } from './runners/dotnet-runners'


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
        return await runRestoreCommand(projectsprojects)
      }
      case 'build': {
        return await runBuildCommand(projectsprojects)
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

export async function runRestoreCommand(): Promise<void> {

}

export async function runBuildCommand(): Promise<void> {

}

export async function runPackCommand(): Promise<void> {

}

run(core.getInput('command'))
