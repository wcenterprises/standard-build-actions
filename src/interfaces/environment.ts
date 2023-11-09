import { IRepository } from "./repository"
import { IDirectories } from "./directories"
import { IUserConfig } from "src/helpers/config-utils"
import { IVersionInfo } from "./version"

export interface IEnvironment {
  timestamp: Date,
  repository: IRepository,
  sha: string,
  directories: IDirectories,
  user_config: IUserConfig
  version: IVersionInfo
}