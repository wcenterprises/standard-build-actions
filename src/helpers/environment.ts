import * as core from '@actions/core'
import process from 'process'
import { getOptionalInput } from './action-util'

export enum EnvVar {
  TIMESTAMP = '__TIMESTAMP',
  ARTIFACTDIRECORY = '__ARTIFACTDIRECORY',
  STAGINGDIRECTORY = '__STAGINGDIRECTORY',
  PACKAGEDIRECTORY = '__PACKAGEDIRECTORY',
  COPYRIGHT = '__COPYRIGHT',
  AUTHORS = '__AUTHORS',
  COMPANY = '__COMPANY',
  CHANNEL = '__CHANNEL',
  VERSION = '__VERSION',
  INFORMATIONALVERSION = '__INFORMATIONALVERSION',
  REVISION = '__REVISION',
  PRODUCT = '__PRODUCT',
  GITHUB_REPO = 'GITHUB_REPO',
  GITHUB_TOKEN = 'GITHUB_TOKEN'
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

export class ActionEnvironment {
  repository: string
  token: string
  artifactDirectory: string
  stagingDirectory: string
  packageDirectory: string

  constructor() {
    this.repository = this.getInput(ActionInput.REPOSITORY, EnvVar.GITHUB_REPO)
    this.token = this.getInput(ActionInput.TOKEN, EnvVar.GITHUB_TOKEN)
    this.artifactDirectory = this.getInput(ActionInput.ARTIFACTDIRECORY, EnvVar.ARTIFACTDIRECORY)
    this.stagingDirectory = this.getInput(ActionInput.STAGINGDIRECTORY, EnvVar.STAGINGDIRECTORY)
    this.packageDirectory = this.getInput(ActionInput.PACKAGEDIRECTORY, EnvVar.PACKAGEDIRECTORY)    
  }

  getInput(key: ActionInput, defaultValue: EnvVar) : string {
    const coreResult = core.getInput(key as string, {required: false})
    if (!coreResult) {
      return process.env[String(defaultValue)] as string
    }
    return coreResult
  }
}
