import {faker} from "@faker-js/faker/locale/cz";

describe('Assignments', () => {
    it('should create new assignment', () => {


        // @ts-ignore
        cy.login(Cypress.env('username'), Cypress.env('password'));
        cy.visit('http://127.0.0.1:3000/assignments')
        cy.contains('Popis')
        cy.contains('Nové zadání').click()
        cy.url().should('include', '/assignments/new')

        cy.get('input[name=title]').type('Testovací zadání').as('title')
        cy.get('#description p').type(faker.lorem.paragraphs(2), {delay: 0}).as('description')

        cy.contains('Uložit').click()

        cy.get('input[name=title]').should('have.value', 'Testovací zadání')
        cy.get('input[name=id]').should('not.be.empty')

        cy.get('Odstranit').click()

    })
})

export {}