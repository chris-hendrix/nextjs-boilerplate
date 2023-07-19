/// <reference types="cypress" />
import { createUserBody } from '../../utils'

describe('User tests', () => {
  let startTime: Date | null = null

  beforeEach(() => { startTime = new Date() })

  afterEach(() => { cy.task('deleteUsers', startTime) })

  it('User can sign up', () => {
    const user = createUserBody()
    cy.visit('/')
    cy.get('[class~="btn-circle"').click()
    cy.contains('a', 'Sign up').click()
    cy.get('input[name="username"]').type(user.username)
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)
    cy.get('input[name="cpassword"]').type(user.password)
    cy.contains('button', 'Sign up').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
