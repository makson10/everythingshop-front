/// <reference types="cypress" />

describe('login', () => {
	beforeEach(() => {
		cy.fixture('login').as('login');

		cy.visit('/');
		cy.setDarkTheme();
	});

	it('go to login page', () => {
		cy.get('#go-to-login-button').click();
		cy.url().should('include', 'login');
	});

	it('login up user', function () {
		cy.get('#go-to-login-button').click();
		cy.url().should('include', 'login');

		cy.get('input[name=login]').type(this.login.login);
		cy.get('input[name=password]').type(this.login.password);
		cy.get('button[type=submit]').click();

		cy.url().should('equal', Cypress.config('baseUrl') + '/');
		cy.getCookie('token').should('exist');

		cy.get('#go-to-login-button').should('not.exist');
	});
});
