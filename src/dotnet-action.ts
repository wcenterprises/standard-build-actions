import * as core from '@actions/core'
import { IEnvironment } from './interfaces/environment'
import { loadEnvironment } from './helpers/cache-utils'
import { safeWhich } from '@chrisgavin/safe-which'
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(command: string): Promise<void> {
  try {
    core.debug('Entering dotnet-action')
    const env: IEnvironment = loadEnvironment(process.env['sba.environment'] as string)
    core.debug('environment loaded...')

    const dotnet = await safeWhich('dotnet')
    console.debug(`dotnet: ${dotnet}`)

    switch (command) {
      case 'restore': {
        await runRestoreCommand()
      }
      case 'build': {
        await runBuildCommand()
      }
      case 'pack': {
        await runPackCommand()
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
