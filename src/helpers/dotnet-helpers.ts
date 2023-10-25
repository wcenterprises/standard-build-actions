import * as core from '@actions/core'
import { ToolRunner } from '@actions/exec/lib/toolrunner'

import * as safeWhich from '@chrisgavin/safe-which'
import { stderr } from 'process'

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
    return version.trim()
  } catch (c) {
    return stderr
  }
}