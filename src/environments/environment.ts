// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const defaultGame = "css";

export const globals = {
	anon_token: localStorage.getItem('anon_user_token'),
	setAnonToken: function() {
	environment.
	token_auth_config.
	globalOptions.
	headers.
	anon_user_token = this.anon_token;
}
};

export const environment = {
	production: false,
	token_auth_config: {
		apiBase: 'http://localhost:3000',
		globalOptions: {
			headers: {
				'Content-Type':     'application/json',
				'Accept':           'application/json',
				"anon_user_token":  globals.anon_token
			}
		}

	},
};


