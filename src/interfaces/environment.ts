import { IRepository } from "./repository"
import { IDirectories } from "./directories"

export interface IEnvironment {
  timestamp: Date,
  repository: IRepository,
  directories: IDirectories
}