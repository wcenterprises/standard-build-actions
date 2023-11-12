import * as core from '@actions/core'
import * as github from '@actions/github'

import fnTranslate from 'md-to-adf'

import * as fs from 'fs'

export const PATTERN_DATE=/\{date\}/g
export const PATTERN_DATETIME=/\{datetime\}/g
export const PATTERN_FOOTER=/\{footer\}/g
export const PATTERN_REPOSITORY=/\{repository\}/g
export const PATTERN_REPOSITORY_NAME=/\{repository-name\}/g
export const PATTERN_REPOSITORY_OWNER=/\{repository-owner\}/g

export async function readFileContent(path: string): Promise<string> {
  let result=''
  fs.readFile(path, (error, data) => {
    if (error) { throw error }
    result += data
  })
  return result
}

export function readFileContentSync(path: string): string {
  return fs.readFileSync(path, 'utf-8')
}

export function transformContent(content: string): string {
  return content
    .replace(PATTERN_DATE, new Date().toDateString())
    .replace(PATTERN_DATETIME, String(new Date()))
    .replace(PATTERN_REPOSITORY, `[${github.context.repo.owner}/${github.context.repo.repo}](${github.context.payload.repository?.html_url})`)
    .replace(PATTERN_REPOSITORY_NAME, `${github.context.repo.repo}`)
    .replace(PATTERN_REPOSITORY_OWNER, `${github.context.repo.owner}`)
}

export function translateMarkdown(markdown: string): any {
  return fnTranslate(transformContent(markdown))
}