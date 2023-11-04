import { IRepository } from "./repository"
import { IDirectories } from "./directories"
import { IUserConfig } from "src/helpers/config-utils"

export interface IEnvironment {
  timestamp: Date,
  repository: IRepository,
  directories: IDirectories,
  user_config: IUserConfig
}