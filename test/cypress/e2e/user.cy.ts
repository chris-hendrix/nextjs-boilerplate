/// <reference types="cypress" />

describe('User tests', () => {
  before(() => {
    cy.visit('')
    cy.signUpUser()
  })
  after(() => { cy.task('deleteTestUsers') })

  it('New user can sign up and logout', () => {
    cy.visit('')
    cy.loginUser()
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
    cy.get('#edit-profile').click()

    cy.get('input[name="name"]').type(text)
    cy.get('button[type="submit"]').click()
    cy.contains('button', 'Close').click()
    cy.contains(text).should('exist')
  })

  it('User can change password', () => {
    cy.visit('')
    cy.loginUser()
    cy.openMenuAndClick('Profile')
    cy.get('#edit-profile').click()
    cy.contains('button', 'Change password').click()
    cy.get('input[name="currentPassword"]').type('Abcd1234!')
    cy.get('input[name="password"]').type('Abcd1234!!')
    cy.get('input[name="confirmPassword"]').type('Abcd1234!!')
    cy.contains('button', 'Save').click()
    cy.contains('div', 'saved')
  })
})
