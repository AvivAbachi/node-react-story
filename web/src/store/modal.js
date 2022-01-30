import useStore from '.';

export const handelModal = (type, data) => {
	useStore.setState(() => ({
		modal:
			type === 'SIGNUP'
				? { type: 'SIGNUP', title: 'Sing Up', inputs: ['username', 'password', 'email', 'show'] }
				: type === 'LOGIN'
				? { type: 'LOGIN', title: 'Login', inputs: ['username', 'password'] }
				: type === 'RESET'
				? { type: 'RESET', title: 'Reset Password', inputs: ['username', 'email'] }
				: type === 'RESET_SUCCESS'
				? { type: 'RESET_SUCCESS', title: 'Reset password Success', data }
				: type === 'UPDATE'
				? { type: 'UPDATE', title: 'Update User', inputs: ['password', 'newPassword', 'email', 'show'] }
				: type === 'CREATE_POST'
				? { type: 'CREATE_POST', title: 'Create New Post', inputs: ['title', 'body'] }
				: type === 'UPDATE_POST'
				? { type: 'UPDATE_POST', title: 'Change Post', inputs: ['title', 'body'], data }
				: type === 'DELETE_POST'
				? { type: 'DELETE_POST', title: 'Delete Post', data }
				: { type: undefined, title: undefined, inputs: undefined, data: undefined },
	}));
};
