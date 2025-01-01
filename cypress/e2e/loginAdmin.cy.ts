/// <reference types="cypress" />

describe('login admin', () => {
	beforeEach(() => {
		cy.fixture('loginAdmin').as('loginAdmin');

		cy.visit('/');
		cy.setDarkTheme();
	});

	it('go to moderate page', () => {
		cy.visit('/moderate');
	});

	it('log in as admin', function () {
		cy.visit('/moderate');

		cy.get('input[name=login]').type(this.loginAdmin.login);
		cy.get('input[name=password]').type(this.loginAdmin.password);
		cy.get('button[type=submit]').click();

		cy.url().should('include', '/moderate/adminpanel');
		cy.getCookie('isAdminAuthorized').should('exist');

		cy.contains('Users').should('exist');
		cy.contains('Products').should('exist');
		cy.contains('Comments').should('exist');
		cy.contains('Feedbacks').should('exist');
	});
});
