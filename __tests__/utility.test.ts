/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as utility from '../src/helpers/utility'
import * as version from '../src/helpers/version-helpers'

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('build number to be correct', async () => {
    const build = version.getBuildNumber(new Date('2023-01-01 11:22:33'))
    expect(build).not.toBeNull()
    expect(build).toBe('0101')
  })

  it('revision number to be correct', async () => {
    const revison = version.getRevison(new Date('2023-01-01 11:22:33'))
    expect(revison).not.toBeNull()
    expect(revison).toBe(31276)
  })

  it('new date to be 3 days hence', async () => {
    const date = new Date('2023-01-01 11:22:33')
    const newDate = utility.addDays(date, 3)

    expect(newDate).not.toBeNull()
    expect(newDate.getMonth()).toBe(0)
    expect(newDate.getDay()).toBe(3)
  })

  it('new date to work with month rollover', async () => {
    const date = new Date('2023-01-31 01:01:01')
    const newDate = utility.addDays(date, 3)

    console.log(`newDate: ${newDate}`)

    expect(newDate).not.toBeNull()
    expect(newDate.getMonth()).toBe(1)
    expect(newDate.getDate()).toBe(3)
  })

  it('new date to work with year rollover', async () => {
    const date = new Date('2023-12-31 01:01:01')
    const newDate = utility.addDays(date, 3)

    expect(newDate).not.toBeNull()
    expect(newDate.getFullYear()).toBe(2024)
    expect(newDate.getMonth()).toBe(0)
    expect(newDate.getDate()).toBe(3)
  })
})
