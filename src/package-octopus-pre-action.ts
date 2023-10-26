import * as core from '@actions/core'

import { UserError } from './helpers/utility'

import { getDotnet, getDotnetVersion, installDotnetTools } from './helpers/dotnet-helpers'

process.argv.forEach((item) => console.log(`process.argv: ${item}`))
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // We're just here to install some stuff
    if(core.isDebug()) {
      const dotnetPath: string = await getDotnet()
      const dotnetVersion: string = await getDotnetVersion()
      core.debug(`dotnet path: ${ dotnetPath } detected`)
      core.debug(`dotnet version: ${ dotnetVersion } detected`)
    }
    
    await installDotnetTools()

  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()