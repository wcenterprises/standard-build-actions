
import fnTranslate, * as mdToAdf from 'md-to-adf'

import * as fs from 'fs'

const PATTERN_DATE=/\{date\}/g
const PATTERN_DATETIME=/\{datetime\}/g
const PATTERN_BODY=/\{body\}/g
const PATTERN_REPOSITORY=/\{repository\}/g
const PATTERN_REPOSITORY_NAME=/\{repository-name\}/g
const PATTERN_REPOSITORY_OWNER=/\{repository-owner\}/g


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
}

export function translateMarkdown(markdown: string): any {
  return fnTranslate(transformContent(markdown))
}