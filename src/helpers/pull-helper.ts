import * as core from '@actions/core'
import { Octokit } from '@octokit/core'

const GH_TOKEN: string = String(process.env.GH_TOKEN)
const octokit = new Octokit({ auth: `${GH_TOKEN}` })

export interface IRepository {
  owner: string,
  name: string
}

export interface IPullRequest {
  id: number,
  number: number,
  state: string,
  title: string,
  body: string[],
  created: Date,
  updated: Date,
  url: URL
}

export function splitRepository(repository: string): IRepository {
  const split: string[]=repository.split('/')
  return {
    owner: `${split.length === 1 ? null : split[0]}`,
    name: `${split.length  === 1 ? split[0] : split[1]}`
  } as IRepository
}

export async function getPulls(repository: string): Promise<IPullRequest[]> {
  const repo = splitRepository(repository)

  const result = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner: `${repo.owner}`,
    repo: `${repo.name}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  let pulls: IPullRequest[] = []
  result.data.forEach((element) => {
    pulls.push(getPull(element))
  })
  return pulls
}

export function getPull(data: any): IPullRequest {
  return {
    id: data.number,
    number: data.number,
    state: data.state,
    title: data.title,
    body: data.body,
    created: new Date(data.created_at),
    updated: new Date(data.updated_at),
    url: new URL(data.html_url)
  } as IPullRequest
}