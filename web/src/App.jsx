import { createContext, memo } from 'react';
import { Layout, List, Modal } from './components';

import { useUser } from './hooks/useUser';
import { usePost } from './hooks/usePost';
import { useModal } from './hooks/useModal';

export const ModalContext = createContext(useModal);
export const UserContext = createContext(useUser);
export const PostContext = createContext(usePost);

const App = () => {
	const modal = useModal();
	const user = useUser();
	const post = usePost();
	return (
		<ModalContext.Provider value={modal}>
			<UserContext.Provider value={user}>
				<PostContext.Provider value={post}>
					<Layout>
						<List />
					</Layout>
					{modal.modal.type && <Modal />}
				</PostContext.Provider>
			</UserContext.Provider>
		</ModalContext.Provider>
	);
};

export default memo(App);
