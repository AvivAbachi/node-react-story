import validator from '../utils/validator';
// { name: '', label: '', type: '', rule: {} }
const passwordRegex = /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/;
const usernameRegex = /^\w+$/;
const username = {
	name: 'username',
	label: 'Username',
	rule: {
		required: 'Username is required.',
		minLength: { value: 6, message: 'more6' },
		maxLength: { value: 16, message: 'less16' },
		pattern: { value: usernameRegex, message: 'Username fuckyou' },
	},
};
const password = {
	name: 'password',
	label: 'Password',
	type: 'password',
	rule: {
		required: 'Password is required.',
		minLength: { value: 8, message: 'more8' },
		maxLength: { value: 16, message: 'less16' },
		pattern: { value: passwordRegex, message: 'Password fuckyou' },
	},
};
const newPassword = {
	name: 'newPassword',
	label: 'New Password',
	type: password.type,
	rule: { ...password.rule, required: undefined },
};
const confirmPassword = {
	name: 'confirmPassword',
	label: 'Confirm Password',
	type: password.type,
	rule: password.rule,
};
const email = {
	name: 'email',
	label: 'Email',
	type: 'email',
	rule: {
		required: 'Email is required.',
		validate: (value) => validator.isEmail(value) || 'Email fuckyou',
	},
};
const emailOptimal = {
	...email,
	rule: { ...email.rule, required: undefined },
};
const show = {
	name: 'show',
	label: 'Display Name',
	rule: { maxLength: { value: 40, message: 'less40' } },
};
const title = {
	name: 'title',
	label: 'Post Title',
	rule: {
		required: 'Post title is required.',
		minLength: { value: 8, message: 'more8' },
		maxLength: { value: 64, message: 'less64' },
	},
};
const body = {
	name: 'body',
	label: 'Post Text',
	rule: { maxLength: { value: 500, message: 'less500' } },
};

const ModalAction = {
	HIDE: { type: null },
	SINGUP: { type: 'SINGUP', title: 'Sing Up', inputs: [username, password, email, show] },
	LOGIN: { type: 'LOGIN', title: 'Login', inputs: [username, password] },
	RESET: { type: 'RESET', title: 'Reset Password', inputs: [username, email] },
	RESET_SUCCESS: { type: 'RESET_SUCCESS', title: 'Reset password Success', inputs: [] },
	UPDATE: { type: 'UPDATE', title: 'Update User', inputs: [password, newPassword, email, show] },
	CREATE_POST: { type: 'CREATE_POST', title: 'Create New Post', inputs: [title, body] },
	UPDATE_POST: { type: 'UPDATE_POST', title: 'Change Post', inputs: [title, body] },
};

export default ModalAction;
