
export interface IVersionInfo {
  major: string,
  minor: number,
  build: string,
  revision: string
  prefix: string,
  suffix: string,
  channel?: string,
  informational: string
}