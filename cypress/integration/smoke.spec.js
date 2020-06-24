/// <reference types="cypress" />

describe('Smoke Test', () => {
    it('should work', () => {
        cy.visit('/')
        cy.get('h1').contains("Vinicius De Antoni");
    });
});