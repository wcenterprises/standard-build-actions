/**
 * Unit tests for the action's entrypoint, src/index.ts
 */

import * as main from '../src/main'
import * as setup from '../src/setup-action'

// Mock the action's entrypoint
const runMock = jest.spyOn(main, 'run').mockImplementation()
const setupMock = jest.spyOn(setup, 'run').mockImplementation()

describe('index', () => {
  it('calls run when imported', async () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../src/index')

    expect(runMock).toHaveBeenCalled()
    expect(setupMock).toHaveBeenCalled()
  })
})
