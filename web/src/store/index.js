import create from 'zustand';
import {devtools, persist, subscribeWithSelector} from 'zustand/middleware';
import axios from 'axios';

// axios.defaults.timeout = 3000;
export const useStore = create(
	devtools(
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
					interval: {start: undefined, stop: undefined},
					user: {username: undefined, name: undefined, userId: undefined, email: undefined},
					post: [],
					modal: {type: undefined, title: undefined, inputs: undefined, data: undefined},
				}),
				{
					name: 'setting',
					partialize: (state) => ({dark: state.dark, theme: state.theme, token: state.token}),
					getStorage: () => sessionStorage,
				}
			)
		),
		{name: 'Story', serialize: {options: true}}
	)
);

useStore.subscribe(
	(state) => state.token,
	(token) => (axios.defaults.headers['x-access-token'] = token),
	{fireImmediately: true}
);

useStore.subscribe(
	(state) => ({theme: state.theme, dark: state.dark}),
	({theme, dark}) => (document.documentElement.className = `${theme}${dark ? ' dark' : ''}`),
	{fireImmediately: true}
);

export {getAccess, login, logout, reset, signup, update} from './user';
export {getPost, createPost, deletePost, toggleUserPost, updatePost, setPage} from './post';
export {handelModal, themeSelector} from './modal';
export default useStore;
