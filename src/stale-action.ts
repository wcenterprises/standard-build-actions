import * as core from '@actions/core'
import { Octokit } from '@octokit/core'

import { ActionEnvironment } from './helpers/environment'

const GH_TOKEN: string = String(process.env.GH_TOKEN)
const octokit = new Octokit({ auth: `${GH_TOKEN}`})


/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const input = getInputs()
    console.log(getRateLimits())


  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

export function getInputs(): any {
  return {
    "repository": `${core.getInput('repository')}`,
    "list": `${core.getInput('list-branches')}`,
    "pr": {      
      "days": `${core.getInput('stale-pr-days')}`,
      "message": core.getMultilineInput('stale-pr-message'),
      "drafts": core.getBooleanInput('stale-pr-ignore-drafts')
    },
    "branches": {
      "days": `${core.getInput('stale-branch-days')}`,
      "message": core.getMultilineInput('stale-branch-message'),
      "template": core.getMultilineInput('stale-branch-report-template')
    }
  }
}

export function getRateLimits(): any {
  return octokit.request('GET /rate_limit', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then()
}

export function getPullRequsts(): any {
  
}

run()