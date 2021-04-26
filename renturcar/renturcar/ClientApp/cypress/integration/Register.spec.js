/// <reference types="cypress" />

describe('<Register />', () => {

    it('Check home screen', () => {
        cy.visit('/Auth/Register');

        cy.get('[data-cy=title]')
                .invoke('text')
                .should('equal', 'Welcome to RentUrCar!');

        cy.get('[data-cy=name]').should('exist')
        cy.get('[data-cy=last-name]').should('exist')        

        cy.get('[data-cy=email]').should('exist')
                .should('have.prop', 'type')
                .should('eq', 'email')

        cy.get('[data-cy=username]').should('exist')

        cy.get('[data-cy=password]').should('exist')
            .should('have.prop', 'type')
            .should('eq', 'password')

        cy.get('[data-cy=login]')
            .should('exist')
            .should('have.prop', 'tagName')
            .should('eq', 'A')

        cy.get('[data-cy=login]')
            .should('have.attr','href')
            .should('eq','/Auth/Login')
        
        cy.get('[data-cy=btn-register]')
            .should('exist')
            .should('have.class', 'btn-primary')
            .and('have.class', 'btn')
                  
    })

    it('Validations and messages', () => {
        cy.visit('/Auth/Register');

        cy.get('[data-cy=email]').type('Esmerlin79@hotmail.com')

        cy.get('[data-cy=btn-register]').click();

        cy.get('[data-cy=alert]').should('exist')
            .invoke('text')
            .should('equal', 'Los Campos son obligatorios');
    })
})