/// <reference types="cypress" />
import { Chance } from 'chance';
const chance = new Chance();

describe('Add Product', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.setDarkTheme();
		cy.login();
	});

	it('go to add product page', () => {
		cy.contains('Add product').click();
		cy.url().should('include', '/addproduct');
	});

	it('add product', () => {
		cy.contains('Add product').click();

		const newProductTitle = chance.word({ length: 10 });
		cy.contains('Choose your photo').selectFile(
			Cypress.env('imageFolderPath') + '/test.png'
		);
		cy.get('input[name=title]').type(newProductTitle);
		cy.get('textarea[name=description]').type(chance.sentence());
		cy.get('input[name=price]').type(
			chance.integer({ min: 10, max: 10000 }).toString()
		);

		cy.intercept(
			'POST',
			Cypress.env('baseServerUrl') + '/products/addNewProduct'
		).as('addProduct');
		cy.get('button[type=submit]').click();
		cy.wait('@addProduct');

		cy.visit('/assortment');
		cy.get('#product-list > :last-child').should(
			'contain.text',
			newProductTitle
		);
	});
});
