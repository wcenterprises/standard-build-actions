import * as core from '@actions/core'

import { ActionEnvironment } from './helpers/environment'
import { TimeStamp } from './helpers/version-helpers'
import { resolveDirectory } from './helpers/utility'
import * as path from 'path'
import { IEnvironment } from './interfaces/environment'

export function getEnvironment(): IEnvironment {
  const repo = core.getInput('repository', {required: true})
  const parsed = repo.split('/')
  const workspace = String(process.env['GITHUB_WORKSPACE'])
  return {
    timestamp: TimeStamp,
    repository: { 
      owner: parsed[0], 
      name: parsed[1],
      token: core.getInput('token', {required: true})
    },    
    directories: {
      workspace: workspace,
      artifacts: resolveDirectory(`${path.join(workspace, '../a')}`, { create: true }),
      staging: resolveDirectory(`${path.join(workspace, '../s')}`, { create: true }),
      output: resolveDirectory(`${path.join(workspace, '../o')}`, { create: true }),
      package: resolveDirectory(`${path.join(workspace, '../p')}`, { create: true })
    }
  } as IEnvironment
}
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    core.debug('Entering setup-action')
    const env: IEnvironment = getEnvironment()
    
    console.log(env)
  } catch (error) {
    // Fail the workflow run if an error occurs
    /* istanbul ignore next */
    if (error instanceof Error) core.setFailed(error.message)
  }
}
run()
