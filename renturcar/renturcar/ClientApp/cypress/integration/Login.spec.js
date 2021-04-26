/// <reference types="cypress" />

describe('<Login />', () => {
    it('Check home screen', () => {
            cy.visit('/');

            cy.get('[data-cy=title]')
                .invoke('text')
                .should('equal', 'RentalUrCar');

            cy.get('[data-cy=username]').should('exist')

            cy.get('[data-cy=password]').should('exist')

            cy.get('[data-cy=password]').should('exist')
                .should('have.prop', 'type')
                .should('eq', 'password')

            cy.get('[data-cy=new-account]')
                .should('exist')
                .should('have.prop', 'tagName')
                .should('eq', 'A')

            cy.get('[data-cy=new-account]')
                .should('have.attr','href')
                .should('eq','/Auth/Register')

            cy.get('[data-cy=btn-register]')
                .should('exist')
                .should('have.class', 'btn-primary')
                .and('have.class', 'btn')

            
            
    })

    it('Validations and messages', () => {
        cy.visit('/');

        cy.get('[data-cy=btn-register]').click();

        cy.get('[data-cy=alert]').should('exist')
    })
})
