import * as core from '@actions/core'
import { getExecOutput, exec } from '@actions/exec'

import { IEnvironment } from './interfaces/environment'
import { loadEnvironment } from './helpers/cache-utils'
import { getDotnet, getDotnetVersion } from './helpers/dotnet-helpers'
import { glob } from 'glob'
import { AsyncResource } from 'async_hooks'

const Environment: IEnvironment = loadEnvironment(process.env['sba.environment'] as string)
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(command: string): Promise<void> {
  try {
    core.debug('Entering dotnet-action')
    
    core.debug('environment loaded...')
    core.debug(`dotnet version: ${await getDotnetVersion()}`)

    const projects: string[] = await glob(core.getInput('projects', {required: true}))

    switch (command) {
      case 'restore': {
        return await runRestoreCommand(projects)
      }
      case 'build': {
        return await runBuildCommand(projects)
      }
      case 'publish': {
        return await runPublishCommand(projects)
      }
      default: {
        throw new Error(`dotnet command '${command}' not implemented!`)
      }
    }    
  } catch (error) {
    // Fail the workflow run if an error occurs
    /* istanbul ignore next */
    if (error instanceof Error) core.setFailed(error.message)
  }
}

export async function runDotnetCommand(args: string[]): Promise<void> {
  console.debug(`${args.join(' ')}`)
  const path=await getDotnet()
  await exec(`"${path}"`, args)
}

export async function runRestoreCommand(projects: string[]): Promise<void> {
  projects.forEach(async (project) =>{    
    await runDotnetCommand(getRestoreArguments(project))
  })  
}

export async function runBuildCommand(projects: string[]): Promise<void> {
  projects.forEach(async (project) =>{    
    await runDotnetCommand(['build', `${project}`, '--configuration', 'release'])
  }) 
}

export function getBuildArguments(project: string): string[] {
  let args: Array<string> = ['build', project]

  if (core.getInput('configuration', { required: true })) {
    args.push('--configuration')
    args.push(core.getInput('configuration', { required: true }))
  }
  args.push('--nologo')

  const extraArgs = core.getMultilineInput('parameters', {required: false})

  if (extraArgs) {
    extraArgs.forEach((item) => {
      args.push(item)
    })    
  }
  if (core.getInput('verbosity')) {
    args.push('--verbosity')
    args.push(core.getInput('verbosity'))
  }
  return args
}

export async function runPackCommand(projects: string[]): Promise<void> {
  projects.forEach((project) =>{
    console.log(project)
    runDotnetCommand([
      'pack',
      project,
      '--nologo',
      '--output',
      Environment.directories.package,
      '--no-build',
      '--no-restore'
    ])
  })
}

export async function runPublishCommand(projects: string[]): Promise<void> {
  projects.forEach((project) =>{    
      runDotnetCommand(getPublishArguments(project))
  })
}
export function getPublishArguments(project: string): string[] {
  let args: string[] = [
    'publish', 
    project,
    `-p:PublishDir=${Environment.directories.staging}`
  ]
  const extraArgs = core.getMultilineInput('parameters', {required: false})
  
  if (extraArgs) {
    extraArgs.forEach((item) => {
      args.push(item)
    })    
  }
  if (core.getInput('verbosity')) {
    args.push(`--verbosity ${core.getInput('verbosity')}`)
  }

  return args
}
export function getRestoreArguments(project: string): string[] {
  let args: Array<string> = ['restore', `${project}`]

  const extraArgs = core.getMultilineInput('parameters', {required: false})
  if (extraArgs) {
    extraArgs.forEach((item) => {
      args.push(item)
    })    
  }
  if (core.getInput('verbosity')) {
    args.push('--verbosity')
    args.push(core.getInput('verbosity'))
  }

  return args
}

run(core.getInput('command', { required: true }))
