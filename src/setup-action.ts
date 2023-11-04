import * as core from '@actions/core'

import { ActionEnvironment } from './helpers/environment'
import { TimeStamp, getBuildNumber, getRevison } from './helpers/version-helpers'
import { resolveDirectory } from './helpers/utility'
import * as path from 'path'
import { IEnvironment } from './interfaces/environment'
import * as crypto from 'crypto'
import { loadEnvironment, saveEnvironment } from './helpers/cache-utils'
import { getUserConfig } from './helpers/config-utils'
import { IVersionInfo } from './helpers/environment'

export function getEnvironment(): IEnvironment {
  const repo = core.getInput('repository', { required: true })
  const parsed = repo.split('/')
  const workspace = String(process.env['GITHUB_WORKSPACE'])
  const tempDirectory = crypto.randomBytes(16).toString('hex')

  return {
    timestamp: TimeStamp,
    repository: {
      owner: parsed[0],
      name: parsed[1],
      token: core.getInput('token', { required: true })
    },
    directories: {
      workspace: resolveDirectory(`${path.join(workspace, '../')}`),
      artifacts: resolveDirectory(`${path.join(workspace, '../a')}`, {create: true}),
      staging: resolveDirectory(`${path.join(workspace, '../s')}`, {create: true}),
      output: resolveDirectory(`${path.join(workspace, '../o')}`, {create: true}),
      package: resolveDirectory(`${path.join(workspace, '../p')}`, {create: true}),
      action: resolveDirectory(`${path.join(__dirname, '../../')}`),
      scripts: resolveDirectory(`${path.join(__dirname, '../../scripts')}`),
      temp: resolveDirectory(`${path.join(String(process.env['RUNNER_TEMP']), tempDirectory)}`, { create: true })
    },
    user_config: getUserConfig(core.getInput('config-file')),
    version: getVersion()

  } as IEnvironment
}

export function getVersion(): IVersionInfo {
  return {
    major: TimeStamp.getFullYear().toString(),
    minor: 1,
    build: getBuildNumber(TimeStamp),
    revision: getRevison(TimeStamp).toString(),
    prefix: `${TimeStamp.getFullYear()}.1.${getBuildNumber(TimeStamp)}`,
    suffix: getRevison(TimeStamp).toString(),
    informational: `${TimeStamp.getFullYear()}.1.${getBuildNumber(TimeStamp)}.${getRevison(TimeStamp)}` 
  }
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    core.debug('Entering setup-action')
    const env: IEnvironment = getEnvironment()
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
