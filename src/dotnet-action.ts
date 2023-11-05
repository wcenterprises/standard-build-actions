import * as core from '@actions/core'
import { IEnvironment } from './interfaces/environment'
import { loadEnvironment } from './helpers/cache-utils'
import { getDotnet, getDotnetVersion } from './helpers/dotnet-helpers'
import { glob } from 'glob'
import { ToolRunner } from '@actions/exec/lib/toolrunner'

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

  try {
    await new ToolRunner(
    await getDotnet(),
    args,
    {
      silent: true,
      listeners: {
        stdout: (data) => {
          console.log(data.toString())
        },
        stderr: (data) => {
          throw new Error(data.toString())
        }
      }
    }
    ).exec()
  } catch (error) {
    throw error
  }
}

export async function runRestoreCommand(projects: string[]): Promise<void> {
 
  projects.forEach((project) =>{    
    let args: string[] = getRestoreArguments(project)
    core.debug(`Restore Args: ${args.join(' ')}`)
    console.debug(`Restore Args: ${args.join(' ')}`)
    
    core.group(`Restore: ${project}`, async () => {      
      runDotnetCommand(args)
    })    
  })
}

export async function runBuildCommand(projects: string[]): Promise<void> {
 
  projects.forEach((project) =>{    
    let args: string[] = getBuildArguments(project)
    core.debug(`Build Args: ${args.join(' ')}`)
    console.debug(`Build Args: ${args.join(' ')}`)
    core.group(`Build: ${project}`, async () => {      
      runDotnetCommand(args)
    })    
  })
}

export function getBuildArguments(project: string): string[] {
  let args: Array<string> = ['build', project]

  if (core.getInput('configuration', { required: true })) {
    args.push(`--configuration ${core.getInput('configuration', { required: true })}`)
  }

  args.push('--output')
  if (core.getInput('output', {required: false}) ) {
    args.push(core.getInput('output'))
  }
  else {
    args.push(`'${Environment.directories.staging}'`)
  }

  const extraArgs = core.getMultilineInput('arguments', {required: false})

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
    console.log(project)
  })
}

export function getRestoreArguments(project: string): string[] {
  let args: Array<string> = ['restore', project]

  const extraArgs = core.getMultilineInput('arguments', {required: false})
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

run(core.getInput('command'))
