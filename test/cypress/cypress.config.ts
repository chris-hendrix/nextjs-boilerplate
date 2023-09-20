import { defineConfig } from 'cypress'
import { deleteTestUsers } from '../utils'
import { APP_URL, TEST_PREFIX } from '../../src/config'

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: APP_URL,
    retries: { runMode: 2, openMode: 1 },
    video: false,
    screenshotOnRunFailure: false,
    downloadsFolder: 'test/cypress/download',
    supportFile: 'test/cypress/support.ts',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, _config) {
      on('task', {
        deleteTestUsers: async () => deleteTestUsers(),
      })
    },
    env: { TEST_PREFIX },
  },
})

export default cypressConfig
