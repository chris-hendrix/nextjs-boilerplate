/* eslint-disable @typescript-eslint/no-namespace */
import { TEST_SECRET } from '../../src/config'

type User = { username: string, email: string, password: string }
declare global {
  namespace Cypress {
    interface Chainable {
      signUpUser: (user?: User) => void,
      loginUser: (user?: User) => void,
      logoutUser: () => void
    }
  }
}

export const createNewUser = () => ({
  username: `${TEST_SECRET}-patch-adams-${new Date().getTime()}`,
  email: `${TEST_SECRET}-patch-adams-${new Date().getTime()}@email.com`,
  password: 'Abcd1234!'
})

export const defaultUser = createNewUser()

Cypress.Commands.add('signUpUser', (user = defaultUser) => {
  cy.get('[class~="btn-circle"').click()
  cy.contains('a', 'Sign up').click()
  cy.get('input[name="username"]').type(user.username)
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.get('input[name="cpassword"]').type(user.password)
  cy.contains('button', 'Sign up').click()
})

Cypress.Commands.add('loginUser', (user = defaultUser) => {
  cy.get('[class~="btn-circle"').click()
  cy.contains('a', 'Log in').click()
  cy.get('input[name="username"]').type(user.username)
  cy.get('input[name="password"]').type(user.password)
  cy.contains('button', 'Sign in with Credentials').click()
})

Cypress.Commands.add('logoutUser', () => {
  cy.get('[class~="btn-circle"').click()
  cy.contains('a', 'Log out').click()
})
