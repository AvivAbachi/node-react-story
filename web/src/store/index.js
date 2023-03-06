import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
	persist(
		() => ({
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
			limit: 15,
			total: 0,
			serverError: false,
			//modal
			theme: 'teal',
			dark: false,
			modal: { type: undefined, data: undefined },
		}),
		{
			name: 'story-setting',
			partialize: (state) => ({
				dark: state.dark,
				theme: state.theme,
				token: state.token,
			}),
			version: undefined,
		}
	)
);

if (import.meta.env.DEV) {
	mountStoreDevtool('Store', useStore);
}

export * as user from './user';
export * as post from './post';
export * as modal from './modal';
export default useStore;
