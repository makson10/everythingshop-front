/// <reference types="cypress" />
import moment from 'moment';
import { Chance } from 'chance';
const chance = new Chance();

describe('signup', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.setDarkTheme();
	});

	it('go to sign up page', () => {
		cy.get('#go-to-login-button').click();
		cy.contains("Already haven't account? Sign Up").children('a').click();
	});

	it('sign up new user', () => {
		cy.get('#go-to-login-button').click();
		cy.contains("Already haven't account? Sign Up").children('a').click();

		cy.url().should('include', 'signup');

		const email = chance.email();
		cy.get('input[name=name]').type(chance.name());
		cy.get('input[name=dateOfBirth]').type(
			moment().year(2006).format('YYYY-MM-DD')
		);
		cy.get('input[name=email]').type(email);
		cy.get('input[name=login]').type(chance.string({ length: 8 }));
		cy.get('input[name=password]').type(chance.string({ length: 8 }));

		cy.get('button[type=submit]').click();
		cy.url().should('equal', Cypress.config('baseUrl'));
		cy.get('#go-to-login-button').should('not.exist');
	});
});
