import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

import storyApi from '../api';

const state = (set, get) => ({
	//user
	token: undefined,
	user: {
		username: undefined,
		name: undefined,
		userId: undefined,
		email: undefined,
	},
	//post
	post: [],
	userPost: false,
	page: 0,
	pages: () => Math.ceil(get().total / get().limit) - 1,
	limit: 15,
	total: 0,
	serverError: false,
	//modal
	theme: 'teal',
	dark: false,
	modal: { type: undefined, data: undefined },
});

const useStore = create(
	subscribeWithSelector(
		persist(state, {
			name: 'setting',
			partialize: (state) => ({
				dark: state.dark,
				theme: state.theme,
				token: state.token,
			}),
		})
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

export * as user from './user';
export * as post from './post';
export * as modal from './modal';
export default useStore;
