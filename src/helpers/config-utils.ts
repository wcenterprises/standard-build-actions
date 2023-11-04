import * as core from '@actions/core'

import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'

import { doesFileExist, UserError } from "./utility"

export interface IUserConfig {
  name: string
  config?: IConfig
}

export interface IConfig {
  copyright: string
  company: string
  authors: string
  product: string
  description: string[]
}

export function getYamlConfig(configPath: string): IUserConfig {
  if (doesFileExist(configPath)) {
    return yaml.load(fs.readFileSync(configPath, 'utf-8')) as IUserConfig
  }
  throw new UserError(`Config file does not exist ${configPath}`)
}

export function getYamlConfigRaw(configPath: string): string | unknown {
  if (doesFileExist(configPath)) {
    return yaml.load(fs.readFileSync(configPath, 'utf-8'))
  }
  throw new UserError(`Config file does not exist ${configPath}`)
}

export function getDefaultUserConfig(): IUserConfig {
  return {
    name: 'standard-build-actions',
    config: {
      copyright: `TODO: Copyright © ${new Date().getFullYear()}`,
      company: 'TODO: Welsh Clan Enterprises',
      authors: 'TODO: Brian Welsh @brian-welsh',
      product: 'TODO: Your product name',
      description: ['TODO: your product description']
    }
  } as IUserConfig
}

export function getUserConfig(configPath: string): IUserConfig {
 if ( doesFileExist(configPath)) {
  return yaml.load(fs.readFileSync(configPath, 'utf-8')) as IUserConfig
 }
 core.warning(`user config file '${configPath}' not found. Using defaults.`)
 return getDefaultUserConfig()
}