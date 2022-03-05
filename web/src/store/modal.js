import useStore from '.';

export const handelModal = (type, data) => {
	useStore.setState(() => ({
		modal:
			type === 'SIGNUP'
				? {type: 'SIGNUP', title: 'Sing Up', inputs: ['username', 'password', 'email', 'name']}
				: type === 'LOGIN'
				? {type: 'LOGIN', title: 'Login', inputs: ['username', 'password']}
				: type === 'RESET'
				? {type: 'RESET', title: 'Reset Password', inputs: ['username', 'email']}
				: type === 'RESET_SUCCESS'
				? {type: 'RESET_SUCCESS', title: 'Reset password Success', data}
				: type === 'UPDATE'
				? {type: 'UPDATE', title: 'Update User', inputs: ['password', 'newPassword', 'email', 'name']}
				: type === 'CREATE_POST'
				? {type: 'CREATE_POST', title: 'Create New Post', inputs: ['title', 'body']}
				: type === 'UPDATE_POST'
				? {type: 'UPDATE_POST', title: 'Change Post', inputs: ['title', 'body'], data}
				: type === 'DELETE_POST'
				? {type: 'DELETE_POST', title: 'Delete Post', data}
				: type === 'COLORS'
				? {type: 'COLORS', title: 'Theme Colors'}
				: {type: undefined, title: undefined, inputs: undefined, data: undefined},
	}));
};

export const themeSelector = {
	red: 'bg-[rgb(239,68,68)]',
	orange: 'bg-[rgb(249,115,22)]',
	amber: 'bg-[rgb(252,211,77)]',
	yellow: 'bg-[rgb(234,179,8)]',
	lime: 'bg-[rgb(132,204,22)]',
	green: 'bg-[rgb(34,197,94)]',
	emerald: 'bg-[rgb(16,185,129)]',
	teal: 'bg-[rgb(20,184,166)]',
	cyan: 'bg-[rgb(6,182,212)]',
	sky: 'bg-[rgb(14,165,233)]',
	blue: 'bg-[rgb(59,130,246)]',
	indigo: 'bg-[rgb(99,102,241)]',
	violet: 'bg-[rgb(139,92,246)]',
	purple: 'bg-[rgb(168,85,247)]',
	fuchsia: 'bg-[rgb(217,70,239)]',
	pink: 'bg-[rgb(236,72,153)]',
	rose: 'bg-[rgb(244,63,94)]',
};
