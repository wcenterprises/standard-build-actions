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
    console.log(await getRateLimits())
    console.log(await getPullRequsts(input))

    const pulls=await getPullRequsts(input)
    pulls.forEach((element: any) => {
      console.log(`- [PR #${element.number}](${element.html_url})\t${element.title}\t@${element.user.login}\t${element.updated_at}`)
    })




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

export async function getRateLimits(): Promise<any> {
  const result = await octokit.request('GET /rate_limit', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  return result.data
}

export async function getPullRequsts(input: any): Promise<any> {
  const repo = { 
    owner: input.repository.split('/')[0], 
    name:  input.repository.split('/')[1] 
  }
  core.debug(`REPO: ${repo.name}`);
  core.debug(`OWNER: ${repo.owner}`);
  
  const result = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner: `${repo.owner}`,
    repo: `${repo.name}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  return result.data
}

//export async function transformPullData(data: any, format: string): Promise<string> {
// }


run()