import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';

import userSlice from './user';
import postSlice from './post';
import modalSlice from './modal';

export const useStore = create(
	devtools((set, get) => ({
		...userSlice(set, get),
		...postSlice(set, get),
		...modalSlice(set, get),
	}))
);

export const selector = {
	//User
	user: (state) => state.user,
	load: (state) => state.load,
	token: (state) => state.token,
	signup: (state) => state.signup,
	login: (state) => state.login,
	logout: (state) => state.logout,
	getAccess: (state) => state.getAccess,
	update: (state) => state.update,
	reset: (state) => state.reset,
	//Post
	post: (state) => state.post,
	userPost: (state) => state.userPost,
	serverError: (state) => state.serverError,
	getPost: (state) => state.getPost,
	toggleUserPost: (state) => state.toggleUserPost,
	createPost: (state) => state.createPost,
	updatePost: (state) => state.updatePost,
	deletePost: (state) => state.deletePost,
	reloadPost: (state) => state.reloadPost,
	//Modal
	modal: (state) => state.modal,
	type: (state) => state.modal.type,
	handelModal: (state) => state.handelModal,
	resetPassword: (state) => state.resetPassword,
	resetSuccess: (state) => state.resetSuccess,
};

export default useStore;
