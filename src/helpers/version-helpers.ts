import { IVersionInfo } from "src/interfaces/version"

export const TimeStamp: Date = new Date()

const ACTION_VERSION: number = 2

export function getRevison(date: Date): number {
  const utcFixed = Date.UTC(1987, 0, 1, 0, 0, 0, 0)
  const utc = new Date(
    Date.UTC(
      1987,
      0,
      1,
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
    )
  )
  return Math.floor((utc.valueOf() - utcFixed.valueOf()) / 1000 / 2)
}

export function getBuildNumber(date: Date): string {
  return `${(date.getMonth() + 1).toString().padStart(2, '0')}${date
    .getDate()
    .toString()
    .padStart(2, '0')}`
}

export function buildVersion(): IVersionInfo {
  return {
    major: TimeStamp.getFullYear().toString(),
    minor: ACTION_VERSION,
    build: getBuildNumber(TimeStamp),
    revision: getRevison(TimeStamp).toString(),
    prefix: `${TimeStamp.getFullYear()}.${ACTION_VERSION}.${getBuildNumber(TimeStamp)}`,
    suffix: getRevison(TimeStamp).toString(),
    informational: `${TimeStamp.getFullYear()}.${ACTION_VERSION}.${getBuildNumber(TimeStamp)}.${getRevison(TimeStamp)}` 
  }
}