import * as core from '@actions/core'
import * as path from 'path'
import * as crypto from 'crypto'

import { IEnvironment } from './interfaces/environment'
import { loadEnvironment, saveEnvironment } from './helpers/cache-utils'
import { buildEnvironment } from './helpers/environment-helpers'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    core.debug('Entering setup-action')
    const env: IEnvironment = buildEnvironment()
    saveEnvironment(`${env.directories.temp}/environment`, env)

    const env2: IEnvironment = loadEnvironment(`${env.directories.temp}/environment`)

    console.log(env)
    console.log(env2)
  } catch (error) {
    // Fail the workflow run if an error occurs
    /* istanbul ignore next */
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
