/// <reference types="cypress" />
import { Chance } from 'chance';
const chance = new Chance();

describe('cart', () => {
	beforeEach(function () {
		cy.visit('/');
		cy.setDarkTheme();
		cy.login();
	});

	it('go to cart', () => {
		cy.contains('Assortment').click();
		cy.url().should('include', 'assortment');
	});

	it('add product to cart', () => {
		cy.contains('Assortment').click();

		cy.get('#product-list > :first-child').click();
		cy.get('button').contains('Add to bag').click();

		cy.get('#cart-button').click();
		cy.url().should('include', 'cart');

		cy.getLocalStorage('cart').then(($cart) => {
			const cartSize = JSON.parse($cart ?? '').length;
			cy.get('#cart-product-list > :nth-child(' + cartSize + ')').should(
				'exist'
			);
		});
	});

	it('delete product from cart', () => {
		cy.addProductToCart();

		cy.visit('/cart');
		cy.getLocalStorage('cart').then(($cart) => {
			const oldCartSize = JSON.parse($cart ?? '').length;
			cy.get('#cart-product-list > :nth-child(1) > div > div > button').click();

			cy.getLocalStorage('cart').then(($cart2) => {
				const currentCartSize = JSON.parse($cart2 ?? '').length;

				cy.wrap(currentCartSize).should('be.lt', oldCartSize);
			});
		});
	});

	it('confirm purchase', () => {
		cy.addProductToCart();

		cy.visit('/cart');
		cy.contains('Confirm purchase').click();
		cy.get('input[name=deliveryAddress]').type(chance.city());
		cy.contains('Confirm').click();

		cy.url().should('equal', Cypress.config('baseUrl') + '/');
		cy.getLocalStorage('cart').then(($cart) => {
			const cartSize = JSON.parse($cart ?? '').length;
			cy.wrap(cartSize).should('equal', 0);
		});
	});
});
