import {faker} from "@faker-js/faker/locale/cz";

describe('Authentication', () => {
  it('should be able to register', () => {
    cy.visit('http://127.0.0.1:3000')
    cy.contains("Zaregistrovat se").click()

    cy.url().should('include','/auth/register')

    cy.get('input[name="inviteCode"]').type(Cypress.env('AdminInviteCode'))

    cy.get('button[type="submit"]').click()

    cy.get('input[name="name"]').type(faker.name.firstName())
    cy.get('input[name="surname"]').type(faker.name.lastName())
    cy.get('input[name="email"]').type(faker.internet.email())
    cy.get('input[name="username"]').type(Cypress.env('username'))
    cy.get('input[name="password"]').type(Cypress.env('password'))

    cy.get('button[type="submit"]').click()

    cy.contains('Registrace byla úspěšná!')

  })

  it('should be able to login', () => {})


})

export {}