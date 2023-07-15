import { defineConfig } from 'cypress'

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    video: false,
    screenshotOnRunFailure: false,
    supportFile: 'test/cypress/support.ts',
    specPattern: 'test/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  },
})

export default cypressConfig
