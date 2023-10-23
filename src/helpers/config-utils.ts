import * as fs from 'fs'
import * as path from 'path'
import * as yaml from 'js-yaml'
import { doesFileExist, UserError } from "./utility"

export interface UserConfig {
  name: string
  config?: Config
}

export interface Config {
  copyright?: string
  company?: string
  authors?: string
  product?: string
  description?: string
}


export function getYamlConfig(configPath: string): UserConfig {
  if (doesFileExist(configPath)) {
    return yaml.load(fs.readFileSync(configPath, 'utf8')) as UserConfig
  }
  throw new UserError(`Config file does not exist ${configPath}`)
}

export function getYamlConfigRaw(configPath: string): string | unknown {
  if (doesFileExist(configPath)) {
    return yaml.load(fs.readFileSync(configPath, 'utf8'))
  }
  throw new UserError(`Config file does not exist ${configPath}`)
}