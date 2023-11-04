import * as core from '@actions/core'
import { ToolRunner } from '@actions/exec/lib/toolrunner'

import * as safeWhich from '@chrisgavin/safe-which'
import { stderr } from 'process'

let dotnettools=[
  {
    "tool": "Octopus.DotNet.Cli",
    "version": "9.1.7"
  }
]

export async function getDotnet(): Promise<string> {
  return await safeWhich.safeWhich('dotnet')
}

export async function getDotnetVersion(): Promise<string> {
  let version: string = ''
  let stderr: string = ''

  try {
    await new ToolRunner(
    await getDotnet(),
    ['--version'],
    {
      silent: true,
      listeners: {
        stdout: (data) => {
          version += data.toString()
        },
        stderr: (data) => {
          stderr += data.toString()
        }
      }
    }
    ).exec()
    console.debug(version.trim())
    return version.trim()
  } catch (c) {
    console.debug(stderr)
    return stderr
  }
}

export async function installDotnetTool(toolId: string, toolVersion: string): Promise<void> {

  let stderr: string = ''
  let result: string = ''

  try {
    await new ToolRunner(
    await getDotnet(),
    ['tool', 'install', '--global', toolId, '--version', toolVersion],
    {
      silent: true,
      listeners: {
        stdout: (data) => {
          result += data.toString()
        },
        stderr: (data) => {
          stderr += data.toString()
        }
      }
    }
    ).exec()
    console.log(result.trim())    
  } catch (c) {
    console.debug(stderr)    
  }
}

export async function installDotnetTools(): Promise<void> {
  dotnettools.forEach((item) => installDotnetTool(item.tool, item.version))
}