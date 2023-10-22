/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as helper from '../src/helpers/version-helpers'

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug')
const getInputMock = jest.spyOn(core, 'getInput')
// const setFailedMock = jest.spyOn(core, 'setFailed')
// const setOutputMock = jest.spyOn(core, 'setOutput')

const calculateRevisionMock = jest.spyOn(helper, 'calculateRevison')
const getBuildNumberMock = jest.spyOn(helper, 'getBuildNumber')

const TimeStamp: Date = helper.TimeStamp

describe('test version-helpers', () => {
  beforeAll(() => {})

  afterAll(() => {})

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {})

  it('getBuildNumber  should return 2-digit number', () => {
    const buildNumber = helper.getBuildNumber(TimeStamp)
    expect(getBuildNumberMock).toHaveReturned()
  })

  it('calculateRevision should return a number of digits', () => {
    const revision = helper.calculateRevison(TimeStamp)
    expect(calculateRevisionMock).toHaveReturned()
  })
})