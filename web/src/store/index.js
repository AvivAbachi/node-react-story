import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initState = (set, get) => ({
	//user
	token: undefined,
	user: {
		username: undefined,
		name: undefined,
		userId: undefined,
		email: undefined,
	},
	setToken: (token) => set({ token }),
	setUser: (user) => set({ user }),
	clearUser: () =>
		set({
			token: undefined,
			user: { username: undefined, name: undefined, userId: undefined, email: undefined },
		}),
	//post
	post: [],
	userPost: false,
	page: 0,
	pages: () => Math.ceil(get().total / get().limit),
	limit: 15,
	total: 0,
	serverError: false,
	nextPage: () => {},
	backPage: () => {},
	setPage: (page) => set({ page }),
	setTotal: (total) => set({ total }),
	toggleUserPost: () => set({ userPost: !get().userPost }),
	//modal
	theme: 'teal',
	dark: false,
	modal: { type: undefined, data: undefined },
	setTheme: (theme) => set({ theme }),
	setModal: ({ type, data }) => set({ modal: { type, data } }),
	closeModal: () => set({ modal: { type: undefined, data: undefined } }),
	toggleDark: () => set({ dark: !get().dark }),
});

const useStore = create(
	persist(initState, {
		name: 'story-setting',
		partialize: (state) => ({
			dark: state.dark,
			theme: state.theme,
			token: state.token,
		}),
		version: undefined,
	})
);

if (import.meta.env.DEV) {
	mountStoreDevtool('Store', useStore);
}

export * as user from './user';
export * as post from './post';
export * as modal from './modal';
export default useStore;
