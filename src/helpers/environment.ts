import * as core from '@actions/core'

import process from 'process'

import { UserConfig, getYamlConfig } from './config-utils'


export enum EnvVar {
  TIMESTAMP = '__TIMESTAMP',
  ARTIFACTDIRECORY = '__ARTIFACTDIRECORY',
  STAGINGDIRECTORY = '__STAGINGDIRECTORY',
  PACKAGEDIRECTORY = '__PACKAGEDIRECTORY',
  CHANNEL = '__CHANNEL',
  VERSION = '__VERSION',
  INFORMATIONALVERSION = '__INFORMATIONALVERSION',
  REVISION = '__REVISION',
  GITHUB_REPO = 'GITHUB_REPO',
  GITHUB_TOKEN = 'GITHUB_TOKEN',
  GITHUB_SHA = 'GITHUB_SHA'
}

export enum ActionInput {
  REPOSITORY = 'repository',
  TOKEN = 'token',
  SHA = 'sha',
  NAME = 'name',
  CONFIGFILE = 'config-file',

  TIMESTAMP = 'timestamp',
  ARTIFACTDIRECORY = 'artifact-directory',
  STAGINGDIRECTORY = 'staging-directory',
  PACKAGEDIRECTORY = 'packaging-directory',
  COPYRIGHT = 'copyright',
  AUTHORS = 'authors',
  COMPANY = 'company',
  CHANNEL = 'channel',
  VERSION = 'version',
  INFORMATIONALVERSION = 'informational-version',
  REVISION = 'revision',
  PRODUCT = 'product',
  WORKSPACE = 'workspace'
}

export enum ActionOutput {
  TIMESTAMP = 'timestamp',
  ARTIFACTDIRECORY = 'artifact-directory',
  STAGINGDIRECTORY = 'staging-directory',
  PACKAGEDIRECTORY = 'packaging-directory',
  CHANNEL = 'channel',
  VERSION = 'version',
  INFORMATIONALVERSION = 'informational-version',
  REVISION = 'revision',
  WORKSPACE = 'workspace'
}

export interface IVersion {
  major: string,
  minor: 1,
  build: string,
  revision: string
  prefix: string,
  suffix: string,
  channel: string,
  informational: string
}
export interface IActionEnvironmet {
  timestamp: Date,
  repository_name: string,
  repository_owner: string,
  sha: string,
  token: string,
  ref: string,
  artifact_directory: string,
  staging_directory: string,
  package_directory: string,
  version: IVersion
}


export class ActionEnvironment {
  repository: string
  token: string
  artifactDirectory: string
  stagingDirectory: string
  packageDirectory: string
  sha: string
  timeStamp: Date
  informationalVersion: string
  version: string
  revision: string
  configuration: UserConfig

  constructor(timeStamp: Date) {

    this.timeStamp = timeStamp
    this.repository = this.getInput(ActionInput.REPOSITORY, EnvVar.GITHUB_REPO)
    this.token = this.getInput(ActionInput.TOKEN, EnvVar.GITHUB_TOKEN)
    this.artifactDirectory = this.getInput(ActionInput.ARTIFACTDIRECORY, EnvVar.ARTIFACTDIRECORY)
    this.stagingDirectory = this.getInput(ActionInput.STAGINGDIRECTORY, EnvVar.STAGINGDIRECTORY)
    this.packageDirectory = this.getInput(ActionInput.PACKAGEDIRECTORY, EnvVar.PACKAGEDIRECTORY)
    this.sha = this.getInput(ActionInput.SHA, EnvVar.GITHUB_SHA)
    this.informationalVersion = this.getInput(ActionInput.INFORMATIONALVERSION, EnvVar.INFORMATIONALVERSION)
    this.version = this.getInput(ActionInput.VERSION, EnvVar.VERSION)
    this.revision = this.getInput(ActionInput.REVISION, EnvVar.REVISION)
    this.configuration = getYamlConfig(core.getInput(ActionInput.CONFIGFILE))
  }

  getInput(key: ActionInput, defaultValue: EnvVar): string {
    const coreResult = core.getInput(key as string, { required: false })
    if (!coreResult) {
      return process.env[String(defaultValue)] as string
    }
    return coreResult
  }
}
