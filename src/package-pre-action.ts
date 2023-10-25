import * as core from '@actions/core'

import { UserError } from './helpers/utility'

import { getDotnet, getDotnetVersion } from './helpers/dotnet-helpers'


/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // We're just here to install some stuff
    const dotnetPath: string = await getDotnet()
    const dotnetVersion: string = await getDotnetVersion()

    core.saveState('dotnet-path', dotnetPath)
    core.saveState('dotnet-version', dotnetVersion)

  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()