import * as fs from 'fs'
import * as path from 'path'
import { ResolveDirectoryOptions } from 'src/options/directory'



/**
 * Get an environment parameter, but throw an error if it is not set.
 */
export function getRequiredEnvParam(paramName: string): string {
  const value = process.env[paramName]
  if (value === undefined || value.length === 0) {
    throw new Error(`${paramName} environment variable must be set`)
  }
  return value
}

/**
 * An Error class that indicates an error that occurred due to
 * a misconfiguration of the action or the CodeQL CLI.
 */
export class UserError extends Error {
  /* eslint-disable-next-line no-useless-constructor */
  constructor(message: string) {
    super(message)
  }
}

/*
 * Returns whether the path in the argument represents an existing directory.
 */
export function doesDirectoryExist(dirPath: string): boolean {
  try {
    const stats = fs.lstatSync(dirPath)
    return stats.isDirectory()
  } catch (e) {
    return false
  }
}

/*
 * Returns whether the file exists
 */
export function doesFileExist(filePath: string): boolean {
  try {
    const stats = fs.lstatSync(filePath)
    return stats.isFile()
  } catch (e) {
    return false
  }
}

export function wrapError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

export function resolveDirectory(testPath: string, options?: ResolveDirectoryOptions): string {
  const newPath = path.resolve(testPath)
  if (options?.create && !doesDirectoryExist(testPath)) {
    fs.mkdirSync(newPath)
  }  
  return newPath
}

export function addDays(date: Date, days: number): Date {
  date.setDate(date.getDate() + days)
  return date;
}

