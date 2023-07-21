/// <reference types="cypress" />

describe('User tests', () => {
  let startTime: Date | null = null

  before(() => { startTime = new Date() })

  after(() => { cy.task('deleteUsers', startTime) })

  it('User can sign up, sign in, and logout', () => {
    // signup
    cy.visit('/')
    cy.signUpUser()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    // login
    cy.loginUser()
    cy.url().should('not.contain', '/api')

    // logout
    cy.logoutUser()
    cy.get('[class~="btn-circle"').click()
    cy.contains('a', 'Log in')
  })

  it('User cannot sign up twice', () => {
    cy.visit('/')
    cy.signUpUser() // same user as previous test
    cy.url().should('eq', `${Cypress.config().baseUrl}/signup`)
  })
})
