/// <reference types="cypress" />

describe('User tests', () => {
  after(() => { cy.task('deleteTestUsers') })

  it('New user can sign up and logout', () => {
    cy.visit('')
    cy.signUpUser()
    cy.openMenuAndClick('Profile')
    cy.logoutUser()
  })

  it('Existing user can sign in and logout', () => {
    cy.visit('')
    cy.loginUser()
    cy.openMenuAndClick('Profile')
    cy.logoutUser()
  })

  it('Existing user cannot sign up twice', () => {
    cy.visit('/')
    cy.signUpUser() // same user as previous test
    cy.contains('button', 'Sign up')
  })

  it('User can edit profile', () => {
    const text = 'Patch Adams'

    cy.visit('')
    cy.loginUser()
    cy.openMenuAndClick('Profile')
    cy.contains('button', 'Edit profile').click()

    cy.get('input[name="name"]').clear().type(text)
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Close').click()
    cy.contains(text).should('exist')
  })
})
