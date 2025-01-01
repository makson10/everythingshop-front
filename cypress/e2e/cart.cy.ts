/// <reference types="cypress" />

describe('cart', () => {
	beforeEach(function () {
		cy.visit('/');
		cy.setDarkTheme();
		cy.login();
	});

	// it('go to cart', () => {
	// 	cy.contains('Assortment').click();
	// 	cy.url().should('include', 'assortment');
	// });

	// it('add product to cart', () => {
	// 	cy.contains('Assortment').click();

	// 	cy.get('#product-list > :first-child').click();
	// 	cy.get('button').contains('Add to bag').click();

	// 	cy.get('#cart-button').click();
	// 	cy.url().should('include', 'cart');

	// 	cy.getLocalStorage('cart').then(($cart) => {
	// 		const cartSize = JSON.parse($cart ?? '').length;
	// 		cy.get('#cart-product-list > :nth-child(' + cartSize + ')').should(
	// 			'exist'
	// 		);
	// 	});
	// });

	it('delete product from cart', () => {
		cy.addProductToCart();

		cy.visit('/cart');
	});
});
