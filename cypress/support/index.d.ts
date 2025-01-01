declare namespace Cypress {
	interface Chainable<Subject = any> {
		setDarkTheme: () => void;
		login: () => void;
		loginWithRequest: () => void;
		addProductToCart: () => void;
	}
}
