/// <reference types="cypress" />

describe('assortment', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.setDarkTheme();
	});

	it('go to assortment page', () => {
		cy.contains('Assortment').click();
		cy.url().should('include', 'assortment');
	});

	it('go to product page', () => {
		cy.contains('Assortment').click();
		cy.url().should('include', 'assortment');

		cy.get('#product-list > :first-child').click();

		cy.get('.swiper').should('exist');
		cy.get('button').contains('Add to bag').should('exist');
	});
});
