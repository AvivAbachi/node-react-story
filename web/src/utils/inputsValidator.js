const usernameRegex = /^\w+$/;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

export const username = {
	name: 'username',
	title: 'Username',
	rule: {
		required: 'Username is required!',
		minLength: { value: 6, message: 'more 6' },
		maxLength: { value: 16, message: 'less 16' },
		pattern: { value: usernameRegex, message: 'Username not Valid!' },
	},
};

export const password = {
	name: 'password',
	title: 'Password',
	type: 'password',
	autoComplete: 'off',
	rule: {
		required: 'Password is required!',
		minLength: { value: 8, message: 'more 8' },
		maxLength: { value: 16, message: 'less 16' },
		pattern: { value: passwordRegex, message: 'Password not Valid!' },
	},
};

export const newPassword = {
	name: 'newPassword',
	title: 'New Password',
	autoComplete: 'off',
	type: password.type,
	rule: { ...password.rule, required: undefined },
};

export const confirmPassword = {
	name: 'confirmPassword',
	title: 'Confirm Password',
	type: password.type,
	rule: password.rule,
};

export const email = {
	name: 'email',
	title: 'Email',
	type: 'email',
	rule: {
		required: 'Email is required!',
		pattern: { value: emailRegex, message: 'Email not Valid!' },
	},
};

export const emailOptimal = {
	...email,
	rule: { ...email.rule, required: undefined },
};

export const name = {
	name: 'name',
	title: 'Display Name',
	rule: { maxLength: { value: 40, message: 'less40' } },
};
export const title = {
	name: 'title',
	title: 'Post Title',
	rule: {
		required: 'Post title is required!',
		minLength: { value: 8, message: 'more 8' },
		maxLength: { value: 64, message: 'less 64' },
	},
};

export const body = {
	name: 'body',
	title: 'Post Text',
	textarea: true,
	rule: { maxLength: { value: 500, message: 'less 500' } },
};
