/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// @ts-ignore
Cypress.Commands.add('login', (username: string, password: string) => {
    const log = Cypress.log({
        displayName: 'LOGIN',
        message: [`🔐 Authenticating | ${username}`],
        // @ts-ignore
        autoEnd: false,
    })
    log.snapshot('before')

    // App landing page redirects to Auth0.
    cy.visit('http://127.0.0.1:3000')
    cy.contains('Přihlásit se').click()

    // Login on Auth0.
    cy.origin(
        "https://gamajun-api-test.stepanek.app/login",
        { args: { username, password } },
        ({ username, password }) => {
            cy.get('input[name=username]').type(username)
            cy.get('input[name=password]').type(password, {log: false})
            cy.get('button[type=submit]').click();
        }
    )

    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('contain', 'http://127.0.0.1:3000')
    cy.contains('Přihlásit se').click()
    cy.url().should('eq', 'http://127.0.0.1:3000/')
    cy.get('h3').should('exist').and('not.be.empty')

    log.snapshot('after')
    log.end()
})

export {}