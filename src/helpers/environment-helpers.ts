
import * as core from '@actions/core'

import * as path from 'path'
import * as crypto from 'crypto'

import { IEnvironment } from "src/interfaces/environment"
import { TimeStamp, buildVersion } from './version-helpers'
import { getUserConfig } from './config-utils'
import { resolveDirectory } from './utility'

export function buildEnvironment(): IEnvironment {
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
    sha: core.getInput('sha'),
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
    version: buildVersion()
  } as IEnvironment
}