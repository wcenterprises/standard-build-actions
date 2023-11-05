import * as core from '@actions/core'
import { IEnvironment } from './interfaces/environment'
import { loadEnvironment } from './helpers/cache-utils'
import { getDotnet, getDotnetVersion } from './helpers/dotnet-helpers'
import { glob } from 'glob'
import { ToolRunner } from '@actions/exec/lib/toolrunner'


/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(command: string): Promise<void> {
  try {
    core.debug('Entering dotnet-action')
    const env: IEnvironment = loadEnvironment(process.env['sba.environment'] as string)
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
  let output: string = ''
  let stderr: string = ''

  try {
    await new ToolRunner(
    await getDotnet(),
    args,
    {
      silent: true,
      listeners: {
        stdout: (data) => {
          output += data.toString()
          console.log(data.toString())
        },
        stderr: (data) => {
          stderr += data.toString()
          core.error(data.toString())
        }
      }
    }
    ).exec()
  } catch (error) {
    console.error(stderr)
    throw error
  }
}

export async function runRestoreCommand(projects: string[]): Promise<void> {
  const args: Array<string> = ['restore']
  const restoreArgs = getRestoreArguments()

  projects.forEach((project) =>{
    console.debug(project)
    let thisArgs: Array<string> = ['restore', project]

    core.group(`Restore: ${project}`, async () => {
      
      runDotnetCommand(thisArgs.concat(restoreArgs))

    })    
  })
}

export async function runBuildCommand(projects: string[]): Promise<void> {
  projects.forEach((project) =>{
    console.log(project)
  })
}

export async function runPackCommand(projects: string[]): Promise<void> {
  projects.forEach((project) =>{
    console.log(project)
  })
}

export function getRestoreArguments(): string[] {
  let args: Array<string> = new Array<string>

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
