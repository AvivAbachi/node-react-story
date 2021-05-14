import React, { createContext, memo } from 'react';
import { Layout, List, Modal } from './components';

import { useUser } from './hooks/useUser';
import { usePost } from './hooks/usePost';
import { useUI } from './hooks/useUI';

export const UIContext = createContext(useUI);
export const UserContext = createContext(useUser);
export const PostContext = createContext(usePost);

const App = () => {
	const ui = useUI();
	const user = useUser();
	const post = usePost();
	return (
		<UIContext.Provider value={ui}>
			<UserContext.Provider value={user}>
				<PostContext.Provider value={post}>
					<Layout>
						<List />
					</Layout>
					<Modal />
				</PostContext.Provider>
			</UserContext.Provider>
		</UIContext.Provider>
	);
};

export default memo(App);
