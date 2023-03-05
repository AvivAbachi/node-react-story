const usernameRegex = /^\w+$/;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

export const username = {
	name: 'username',
	input: {
		title: 'Username',
	},
	rule: {
		required: 'Username is required!',
		minLength: { value: 6, message: 'more 6' },
		maxLength: { value: 16, message: 'less 16' },
		pattern: { value: usernameRegex, message: 'Username not Valid!' },
	},
};

export const password = {
	name: 'password',
	input: {
		title: 'Password',
		type: 'password',
		autoComplete: 'off',
	},
	rule: {
		required: 'Password is required!',
		minLength: { value: 8, message: 'more 8' },
		maxLength: { value: 16, message: 'less 16' },
		pattern: { value: passwordRegex, message: 'Password not Valid!' },
	},
};

export const newPassword = {
	name: 'newPassword',
	input: {
		...password.input,
		title: 'New Password',
	},
	rule: { ...password.rule, required: undefined },
};

export const confirmPassword = {
	name: 'confirmPassword',
	input: {
		...password.input,
		title: 'Confirm Password',
	},
	rule: password.rule,
};

export const email = {
	name: 'email',
	input: {
		title: 'Email',
		type: 'email',
	},
	rule: {
		required: 'Email is required!',
		pattern: {
			value: emailRegex,
			message: 'Email not Valid!',
		},
	},
};

export const emailOptimal = {
	...email,
	rule: {
		...email.rule,
		required: undefined,
	},
};

export const name = {
	name: 'name',
	input: {
		title: 'Display Name',
	},
	rule: {
		maxLength: { value: 40, message: 'less40' },
	},
};
export const title = {
	name: 'title',
	input: {
		title: 'Post Title',
	},
	rule: {
		required: 'Post title is required!',
		minLength: { value: 8, message: 'more 8' },
		maxLength: { value: 64, message: 'less 64' },
	},
};

export const body = {
	name: 'body',
	input: {
		title: 'Post Text',
		textarea: true,
	},
	rule: { maxLength: { value: 500, message: 'less 500' } },
};
