import { defineConfig } from 'cypress'
import Cleaner from '../cleaner'

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    screenshotOnRunFailure: false,
    downloadsFolder: 'test/cypress/download',
    supportFile: 'test/cypress/support.ts',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, _config) {
      on('task', {
        deleteUsers: async (startTime: Date) => new Cleaner(startTime).deleteUsers(),
      })
    },
  },
})

export default cypressConfig
