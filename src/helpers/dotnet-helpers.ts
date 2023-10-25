import * as core from '@actions/core'
import { ToolRunner } from '@actions/exec/lib/toolrunner'

import * as safeWhich from '@chrisgavin/safe-which'

export async function getDotnet(): Promise<string> {
  return await safeWhich.safeWhich('dotnet')
}

export async function getDotnetVersion(): Promise<string> {
  let version: string = ''
  await new ToolRunner(
   await getDotnet(),
   ['-v'],
   {
    silent: true,
    listeners: {
      stdout: (data) => {
        version = data.toString()
      },
      stderr: (data) => {
        version = data.toString()
      }
    }
   }
  ).exec()
  return version
}