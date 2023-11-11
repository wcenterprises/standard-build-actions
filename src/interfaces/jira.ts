export interface IJiraIssue {
  // expand: string
  id: string
  self: string
  key: string
  // properties: Properties
  fields: IJiraIssueFields
}

// export interface Properties {}

export interface IJiraIssueFields {
  summary: string
  status: IJiraIssueFields
}

export interface IJiraIssueStatus {
  self: string
  description: string
  iconUrl: string
  name: string
  id: string
  statusCategory: any[]
}