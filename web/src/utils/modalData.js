import { post, user } from '../store';

const modalData = {
	SIGNUP: {
		title: 'Sing Up',
		action: 'Sing Up',
		inputs: ['username', 'password', 'email', 'name'],
		onSubmit: user.signup,
	},
	LOGIN: {
		title: 'Login',
		action: 'Login',
		inputs: ['username', 'password'],
		onSubmit: user.login,
	},
	RESET: {
		title: 'Reset Password',
		action: 'Reset Password',
		inputs: ['username', 'email'],
		onSubmit: user.reset,
	},
	UPDATE: {
		title: 'Update User',
		action: 'Update User',
		inputs: ['password', 'newPassword', 'email', 'name'],
		onSubmit: user.update,
	},
	CREATE_POST: {
		title: 'Create New Post',
		action: 'Create Post',
		inputs: ['title', 'body'],
		onSubmit: post.createPost,
	},
	UPDATE_POST: {
		title: 'Update Post',
		action: 'Update Post',
		inputs: ['title', 'body'],
		onSubmit: post.updatePost,
	},
	DELETE_POST: {
		title: 'Delete Post',
		action: 'Delete Post',
		inputs: [],
		onSubmit: post.deletePost,
	},
	RESET_SUCCESS: undefined,
	THEME: undefined,
};

export default modalData;
