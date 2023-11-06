import * as core from '@actions/core'
import { IEnvironment } from './interfaces/environment'
import { loadEnvironment } from './helpers/cache-utils'
import { getDotnet, getDotnetVersion } from './helpers/dotnet-helpers'
import { glob } from 'glob'
import { ToolRunner } from '@actions/exec/lib/toolrunner'
import { getExecOutput } from '@actions/exec'

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
      case 'pack': {
        return await runPackCommand(projects)
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
  var path=await getDotnet()
  args.forEach((project) => {
    getExecOutput(path, args)
  })
}

export async function runRestoreCommand(projects: string[]): Promise<void> {
 
  projects.forEach((project) =>{    
    let args: string[] = getRestoreArguments(project)
    core.debug(`Restore Args: ${args.join(' ')}`)
    console.debug(`Restore Args: ${args.join(' ')}`)
    
    core.group(`Restore: ${project}`, async () => {      
      await runDotnetCommand(args)
    })    
  })
}

export async function runBuildCommand(projects: string[]): Promise<void> {
 
  projects.forEach((project) =>{    
    let args: string[] = getBuildArguments(project)
    core.debug(`Build Args: ${args.join(' ')}`)
    console.debug(`Build Args: ${args.join(' ')}`)
    core.group(`Build: ${project}`, async () => {      
      await runDotnetCommand(args)
    })    
  })
}

export function getBuildArguments(project: string): string[] {
  let args: Array<string> = ['build', project]

  if (core.getInput('configuration', { required: true })) {
    args.push(`--configuration ${core.getInput('configuration', { required: true })}`)
  }
  args.push('--nologo')

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

export async function runPackCommand(projects: string[]): Promise<void> {
  projects.forEach((project) =>{
    console.log(project)
  })
}

export async function runPublishCommand(projects: string[]): Promise<void> {
  projects.forEach((project) =>{    
    let args: string[] = getPublishArguments(project)
    core.debug(`Publish Args: ${args.join(' ')}`)
    console.debug(`Publish Args: ${args.join(' ')}`)
    core.group(`Publish: ${project}`, async () => {      
      await runDotnetCommand(args)
    })    
  })
}
export function getPublishArguments(project: string): string[] {
  let args: Array<string> = ['publish', project, '--nologo']

  if (core.getInput('output', { required: false })) {
    args.push(`--output ${core.getInput('output', { required: false })}`)
  }
  else {
    args.push(`--output ${Environment.directories.staging})}`)
  }

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
  let args: Array<string> = ['restore', project]

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

run(core.getInput('command', { required: true }))
