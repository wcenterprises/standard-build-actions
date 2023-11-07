import * as core from '@actions/core'
import { exec } from '@actions/exec'
import { getDotnet } from './dotnet-helpers'
import { IEnvironment } from '../interfaces/environment'
import { loadEnvironment } from './cache-utils'

const Environment: IEnvironment = loadEnvironment(process.env['sba.environment'] as string)

export async function runDotnetCommand(args: string[]): Promise<void> {  
  const path = await getDotnet()
  await exec(`${path}`, args)
}

export async function runRestoreCommand(projects: string[]): Promise<void> {
  projects.forEach(async (project) =>{    
    await runDotnetCommand(getRestoreArguments(project))
  })  
}

export async function runBuildCommand(projects: string[]): Promise<void> {
  projects.forEach(async (project) =>{    
    await runDotnetCommand(getBuildArguments(project))
  }) 
}

export async function runPublishCommand(projects: string[]): Promise<void> {
  projects.forEach((project) =>{    
      runDotnetCommand(getPublishArguments(project))
  })
}

export async function runPackCommand(projects: string[]): Promise<void> {  
  projects.forEach((project) =>{    
    runDotnetCommand(getPackArguments(project))
  })
}

export function getBuildArguments(project: string): string[] {
  let args: Array<string> = ['build', project]

  if (core.getInput('configuration', { required: true })) {
    args.push('--configuration')
    args.push(core.getInput('configuration', { required: true }))
  }
  args.push('--nologo')

  const extraArgs: Array<string> = core.getMultilineInput('parameters', {required: false})
  if (extraArgs) {
    args = args.concat(extraArgs)
  }

  args.push(`-p:Copyright="${Environment.user_config.config?.copyright}"`)
  args.push(`-p:Authors="${Environment.user_config.config?.authors}"`)
  args.push(`-p:Company="${Environment.user_config.config?.company}"`)
  args.push(`-p:AssemblyVersion="${Environment.user_config.config?.copyright}"`)
  args.push(`-p:FileVersion="${Environment.version.major}"`)
  args.push(`-p:InformationalVersion="${Environment.version.informational}+${Environment.sha}"`)

  if (core.getInput('verbosity')) {
    args.push('--verbosity')
    args.push(core.getInput('verbosity'))
  }
  return args
}

export function getPackArguments(project: string): string[] {
  let args: Array<string> = ['pack', project]

  if (core.getInput('configuration', { required: true })) {
    args.push('--configuration')
    args.push(core.getInput('configuration', { required: true }))
  }
  args.push('--outdir')
  args.push(`${Environment.directories.package}`)

  const extraArgs = core.getMultilineInput('parameters', {required: false})  
  if (extraArgs) {
    args = args.concat(extraArgs)
  }

  if (core.getInput('verbosity')) {
    args.push(`--verbosity ${core.getInput('verbosity')}`)
  }
  return args  
}

export function getPublishArguments(project: string): string[] {
  let args: Array<string> = ['publish', project]

  if (core.getInput('configuration', { required: true })) {
    args.push('--configuration')
    args.push(core.getInput('configuration', { required: true }))
  }
  args.push(`-p:PublishDir=${Environment.directories.staging}`)

  const extraArgs = core.getMultilineInput('parameters', {required: false})  
  if (extraArgs) {
    args = args.concat(extraArgs)
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
    args = args.concat(extraArgs)
  }
  if (core.getInput('verbosity')) {
    args.push('--verbosity')
    args.push(core.getInput('verbosity'))
  }
  return args
}
