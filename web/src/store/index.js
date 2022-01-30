import create from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import axios from 'axios';

export const useStore = create(
	devtools(
		subscribeWithSelector(
			persist(
				(set, get) => ({
					token: undefined,
					userPost: false,
					serverError: false,
					page: 0,
					limit: 4,
					total: 0,
					pages: () => Math.floor(get().total / get().limit),
					user: { username: undefined, show: undefined, userId: undefined, email: undefined },
					modal: { type: undefined, title: undefined, inputs: undefined, data: undefined },
					interval: { start: undefined, stop: undefined },
					post: [],
				}),
				{ name: 'setting', partialize: (state) => ({ token: state.token }), getStorage: () => sessionStorage }
			)
		),
		{ name: 'Story', serialize: { options: true } }
	)
);

axios.defaults.timeout = 3000;
useStore.subscribe(
	(state) => state.token,
	(token) => (axios.defaults.headers['x-access-token'] = token),
	{ fireImmediately: true }
);

export { getAccess, login, logout, reset, signup, update } from './user';
export { getPost, createPost, deletePost, toggleUserPost, updatePost } from './post';
export { handelModal } from './modal';
export default useStore;
