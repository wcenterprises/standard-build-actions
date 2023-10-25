import * as core from '@actions/core'

import * as safeWhich from '@chrisgavin/safe-which'

export async function getDotnet(): Promise<string> {
  return await safeWhich.safeWhich('dotnet')
}