import useStore, {
	createPost,
	deletePost,
	login,
	reset,
	signup,
	update,
	updatePost,
} from '.';

export const setModal = (type, data) => {
	useStore.setState({ modal: { type, data } });
};

export const modalData = {
	SIGNUP: {
		title: 'Sing Up',
		action: 'Sing Up',
		inputs: ['username', 'password', 'email', 'name'],
		submit: signup,
	},
	LOGIN: {
		title: 'Login',
		action: 'Login',
		inputs: ['username', 'password'],
		submit: login,
	},
	RESET: {
		title: 'Reset Password',
		action: 'Reset Password',
		inputs: ['username', 'email'],
		submit: reset,
	},

	UPDATE: {
		title: 'Update User',
		action: 'Update User',
		inputs: ['password', 'newPassword', 'email', 'name'],
		submit: update,
	},
	CREATE_POST: {
		title: 'Create New Post',
		action: 'Create Post',
		inputs: ['title', 'body'],
		submit: createPost,
	},
	UPDATE_POST: {
		title: 'Update Post',
		action: 'Update Post',
		inputs: ['title', 'body'],
		submit: updatePost,
	},
	DELETE_POST: {
		title: 'Delete Post',
		action: 'Delete Post',
		inputs: [],
		submit: deletePost,
	},
	RESET_SUCCESS: null,
	THEME: null,
};

export const themeData = {
	red: 'bg-[rgb(239,68,68)]',
	orange: 'bg-[rgb(249,115,22)]',
	amber: 'bg-[rgb(234,179,8)]',
	yellow: 'bg-[rgb(252,211,77)]',
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
