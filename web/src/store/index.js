import create from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import axios from 'axios';
import { mountStoreDevtool } from 'simple-zustand-devtools';

// axios.defaults.timeout = 3000;
export const useStore = create(
	subscribeWithSelector(
		persist(
			(set, get) => ({
				token: undefined,
				userPost: false,
				serverError: false,
				theme: 'teal',
				dark: false,
				isMobile: true,
				page: 0,
				limit: 15,
				total: 0,
				pages: () => Math.ceil(get().total / get().limit) - 1,
				interval: { start: undefined, stop: undefined },
				user: {
					username: undefined,
					name: undefined,
					userId: undefined,
					email: undefined,
				},
				post: [],
				modal: { type: undefined, data: undefined },
			}),
			{
				name: 'setting',
				partialize: (state) => ({
					dark: state.dark,
					theme: state.theme,
					token: state.token,
				}),
				getStorage: () => sessionStorage,
			}
		)
	)
);

if (process.env.NODE_ENV === 'development') {
	mountStoreDevtool('Store', useStore);
}

useStore.subscribe(
	(state) => state.token,
	(token) => (axios.defaults.headers['x-access-token'] = token),
	{ fireImmediately: true }
);

useStore.subscribe(
	(state) => ({ theme: state.theme, dark: state.dark }),
	({ theme, dark }) =>
		(document.documentElement.className = `${theme}${dark ? ' dark' : ''}`),
	{ fireImmediately: true }
);

export { getAccess, login, logout, reset, signup, update } from './user';
export {
	getPost,
	createPost,
	deletePost,
	toggleUserPost,
	updatePost,
	setPage,
} from './post';
export { setModal, modalData, themeData } from './modal';
export default useStore;
