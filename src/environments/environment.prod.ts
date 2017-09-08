export const defaultGame = "Know The Basics";

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
	production: true,
	token_auth_config: {
		apiBase: 'https://jst-be.herokuapp.com',
		globalOptions: {
			headers: {
				'Content-Type':     'application/json',
				'Accept':           'application/json',
				"anon_user_token":  globals.anon_token
			}
		}

	},
};


