import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000',
		env: {
			baseServerUrl: 'http://127.0.0.1:10000',
			imageFolderPath: './cypress/fixtures/images',
		},
		setupNodeEvents(on, config) {
			require('cypress-localstorage-commands/plugin')(on, config);
			return config;
		},
	},
});
