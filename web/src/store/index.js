import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { createJSONStorage, persist, subscribeWithSelector } from 'zustand/middleware';

import storyApi from '../api';

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
				storage: createJSONStorage(() => localStorage),
			}
		)
	)
);

if (import.meta.env.DEV) {
	mountStoreDevtool('Store', useStore);
}

useStore.subscribe(
	(state) => state.token,
	(token) => {
		storyApi.defaults.headers['Authorization'] = token;
	},
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
