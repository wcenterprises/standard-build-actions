import * as core from '@actions/core'
import { Octokit } from '@octokit/core'

import { ActionEnvironment } from './helpers/environment'
import * as stale from './helpers/stale-helper'
import { addDays } from './helpers/utility'
import { getPulls } from './helpers/pull-helper'

const GH_TOKEN: string = String(process.env.GH_TOKEN)
const octokit = new Octokit({ auth: `${GH_TOKEN}` })

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const environment: stale.IStaleEnvironment = stale.getStaleEnvironment()
    //console.log(await getRateLimits())
    //console.log(await getPullRequsts(input))

    
    const prExpireDate: Date = addDays(new Date(), environment.pr.days)
    const brExpireDate: Date = addDays(new Date(), environment.branches.days)

    const pulls = await getPulls(environment.repository)
    pulls.forEach((element: any) => {
      let pullDate = new Date(element.updated_at)
      if (prExpireDate.getTime() <= pullDate.getTime()) {
        setPullComment(element.number, `${environment.pr.message}`, environment)
      }
    })
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
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



export async function setPullComment(
  pull: number,
  comment: string,
  input: any
): Promise<void> {
  const repo = {
    owner: input.repository.split('/')[0],
    name: input.repository.split('/')[1]
  }
  await octokit.request(
    'POST /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner: `${repo.owner}`,
      repo: `${repo.name}`,
      issue_number: pull,
      body: `${comment}`,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      },
      per_page: 100,
      sort: 'updated',
      direction: 'asc',
      state: 'open'
    }
  )
}

export async function getLabel(label: string): Promise<any> { return null }

//export async function transformPullData(data: any, format: string): Promise<string> {
// }

run()
