/* eslint-disable @typescript-eslint/no-namespace */
type User = { name: string, email: string, password: string }
declare global {
  namespace Cypress {
    interface Chainable {
      signUpUser: (user?: User) => void,
      loginUser: (user?: User) => void,
      logout: () => void
    }
  }
}

export const createNewUser = () => ({
  name: `Patch Adams ${new Date().getTime()}`,
  email: `patch-adams-${new Date().getTime()}@email.com`,
  password: 'Abcd1234!'
})

export const createNewMessage = () => ({
  content: `Hello World! ${new Date().getTime()}`
})

export const defaultUser = createNewUser()
export const defaultMessage = createNewMessage()

Cypress.Commands.add('signUpUser', (user = defaultUser) => {
  cy.visit('/signup')
  cy.get('[class~="signUpWithEmailButton"').click()
  cy.get('input[name="name"]').type(user.name)
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.get('input[name="cpassword"]').type(user.password)
  cy.get('[class~="signUpButton"').click()
})

Cypress.Commands.add('loginUser', (user = defaultUser) => {
  cy.visit('/api/auth/signin')
  cy.get('input[name="email"]').type(user.email)
  cy.get('input[name="password"]').type(user.password)
  cy.contains('button', 'Sign in with Credentials').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('[class~="logoutMenuButton"').click()
})
