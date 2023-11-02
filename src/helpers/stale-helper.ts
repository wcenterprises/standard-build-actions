import * as core from '@actions/core'

export const environment: IStaleEnvironment = getStaleEnvironment()


export interface IPullInput {
  days: number,
  message: string[],
  drafts: boolean
}

export interface IBranchInput {
  days: number,
  message: string[],
  template: string[]
}

export interface IStaleEnvironment {
  repository: string,
  list: boolean,
  pr: IPullInput,
  branches: IBranchInput
}

export function getStaleEnvironment(): IStaleEnvironment {
  return {
    repository: `${core.getInput('repository')}`,
    list: core.getBooleanInput(`${core.getInput('list-branches')}`),
    pr: {
      days: Number(`${core.getInput('stale-pr-days')}`),
      message: core.getMultilineInput('stale-pr-message'),
      drafts: core.getBooleanInput('stale-pr-ignore-drafts')
    },
    branches: {
      days: Number(`${core.getInput('stale-branch-days')}`),
      message: core.getMultilineInput('stale-branch-message'),
      template: core.getMultilineInput('stale-branch-report-template')
    }
  } as IStaleEnvironment
}