/// <reference types="cypress" />

describe('User tests', () => {
  after(() => { cy.task('deleteTestUsers') })

  it('New user can sign up and logout', () => {
    cy.visit('')
    cy.signUpUser()
    cy.openMenuAndClick('Profile')
    cy.logoutUser()
  })

  // it('Existing user can sign in and logout', () => {
  //   cy.visit('/')
  //   cy.loginUser()
  //   cy.openMenuAndClick('Profile')
  //   cy.logoutUser()
  // })

  // it('Existing user cannot sign up twice', () => {
  //   cy.visit('/')
  //   cy.signUpUser() // same user as previous test
  //   cy.contains('button', 'Sign up')
  // })
})
