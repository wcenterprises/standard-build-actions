/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/todo-action'

// Mock the GitHub Actions core library
const debugMock = jest.spyOn(core, 'debug')
const warnMock = jest.spyOn(core, 'warning')

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('outputs a warning', async () => {

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(1, 'Entering todo-action')
    expect(warnMock).toHaveBeenNthCalledWith(1, 'TODO: This action is not yet implemented.')
  })
})
