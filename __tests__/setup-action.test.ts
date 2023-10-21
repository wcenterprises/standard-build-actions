/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as setup from '../src/setup-action'

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug')
const getInputMock = jest.spyOn(core, 'getInput')
// const setFailedMock = jest.spyOn(core, 'setFailed')
// const setOutputMock = jest.spyOn(core, 'setOutput')

// Mock the action's main function
const setupMock = jest.spyOn(setup, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('set expected values', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'repository':
          return 'wcenterprises/standard-build-actions'
        case 'token':
          return 'mock-token'
        case 'config-file':
          return 'mock-config.yml'
        default:
          return ''
      }
    })

    await setup.run()
    expect(setupMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly

    expect(getInputMock).toHaveBeenNthCalledWith(1, 'repository', {
      required: true
    })
    expect(getInputMock).toHaveBeenNthCalledWith(2, 'token', { required: true })
    expect(getInputMock).toHaveBeenNthCalledWith(3, 'config-file', {
      required: false
    })

    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'repository: wcenterprises/standard-build-actions'
    )
    expect(debugMock).toHaveBeenNthCalledWith(2, 'token: mock-token')
    expect(debugMock).toHaveBeenNthCalledWith(3, 'config-file: mock-config.yml')
  })

  it('sets a failed status', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation((name: string): string => {
      switch (name) {
        case 'repo':
          return 'repo'
        default:
          return ''
      }
    })

    await setup.run()
    expect(setupMock).toHaveReturned()

    // expect(setFailedMock).toHaveBeenNthCalledWith(1, 'not-repository')
  })
})
