const modalSlice = (set, get) => ({
	modal: { type: null },

	handelModal: (mode, data) =>
		set(() => {
			switch (mode) {
				case 'SIGNUP':
					return { modal: { type: 'SIGNUP', title: 'Sing Up', inputs: ['username', 'password', 'email', 'show'] } };
				case 'LOGIN':
					return { modal: { type: 'LOGIN', title: 'Login', inputs: ['username', 'password'] } };
				case 'RESET':
					return { modal: { type: 'RESET', title: 'Reset Password', inputs: ['username', 'email'] } };
				case 'RESET_SUCCESS':
					return { modal: { type: 'RESET_SUCCESS', title: 'Reset password Success', username: data.username, password: data.password } };
				case 'UPDATE':
					return { modal: { type: 'UPDATE', title: 'Update User', inputs: ['password', 'newPassword', 'email', 'show'] } };
				case 'CREATE_POST':
					return { modal: { type: 'CREATE_POST', title: 'Create New Post', inputs: ['title', 'body'] } };
				case 'UPDATE_POST':
					return {
						modal: { type: 'UPDATE_POST', title: 'Change Post', inputs: ['title', 'body'], id: data.id, title: data.title, body: data.body },
					};
				case 'DELETE_POST':
					return { modal: { type: 'DELETE_POST', title: 'Delete Post', id: data.id } };
				default:
					return { modal: { type: null } };
			}
		}),

	resetPassword: () => {
		get().handelModal(modal.type === 'LOGIN' ? 'RESET' : 'LOGIN');
	},

	resetSuccess: () => {
		get().handelModal('LOGIN');
	},
});

export default modalSlice;
