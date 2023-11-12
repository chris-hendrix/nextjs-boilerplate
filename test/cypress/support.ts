/* eslint-disable @typescript-eslint/no-namespace */
import { TEST_EMAIL_DOMAIN } from '../utils'

type User = { username: string, email: string, password: string }
declare global {
  namespace Cypress {
    interface Chainable {
      signUpUser: (user?: User) => void,
      loginUser: (user?: User) => void,
      logoutUser: () => void,
      openMenuAndClick: (linkText: string) => void
    }
  }
}

export const createNewUser = () => ({
  username: `patch-adams-${new Date().getTime()}`,
  email: `patch-adams-${new Date().getTime()}@${TEST_EMAIL_DOMAIN}`,
  password: 'Abcd1234!'
})

export const defaultUser = createNewUser()

Cypress.Commands.add('openMenuAndClick', (linkText) => {
  cy.get('[id="dropdown"]').click()
  cy.contains('li', linkText).click()
})

Cypress.Commands.add('signUpUser', (user = defaultUser) => {
  cy.openMenuAndClick('Sign up')
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.get('input[name="confirmPassword"]').type(user.password)
  cy.contains('button', 'Sign up').click()
})

Cypress.Commands.add('loginUser', (user = defaultUser) => {
  cy.openMenuAndClick('Log in')
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.contains('button', 'Log in').click()
})

Cypress.Commands.add('logoutUser', () => cy.openMenuAndClick('Log out'))
