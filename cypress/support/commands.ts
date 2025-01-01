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

import 'cypress-localstorage-commands';

Cypress.Commands.add('setDarkTheme', () => {
	window.localStorage.setItem('isDarkTheme', 'true');
});

Cypress.Commands.add('login', function () {
	cy.visit('/');
	cy.get('#go-to-login-button').click();

	cy.fixture('login').then(({ login, password }) => {
		cy.get('input[name=login]').type(login);
		cy.get('input[name=password]').type(password);
	});

	cy.get('button[type=submit]').click();
});

Cypress.Commands.add('loginWithRequest', function () {
	cy.fixture('login').then((login) => {
		cy.request(
			'POST',
			Cypress.env('baseServerUrl') + 'customers/login',
			login
		).then((res) => {
			cy.setCookie('token', res.body.token);
		});
	});
});

Cypress.Commands.add('addProductToCart', function () {
	cy.visit('/');
	cy.contains('Assortment').click();

	cy.get('#product-list > :first-child').click();
	cy.get('button').contains('Add to bag').click();
});
