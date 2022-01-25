import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';

import userSlice from './user';
import postSlice from './post';
import modalSlice from './modal';

export const useStore = create(
	devtools(
		persist(
			(set, get) => ({
				...userSlice(set, get),
				...postSlice(set, get),
				...modalSlice(set, get),
			}),
			{
				name: 'setting',
				partialize: (store) => ({ token: store.token }),
				getStorage: () => sessionStorage,
			}
		),
		{ serialize: { options: true } }
	)
);

export default useStore;
