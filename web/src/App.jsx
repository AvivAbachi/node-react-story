import { memo, useContext } from 'react';
import { Layout, List, Modal } from './components';
import { PostContext, ModalContext } from './hooks';

const App = () => {
	const { modal } = useContext(ModalContext);
	const { post, userPost } = useContext(PostContext);

	return (
		<Layout>
			<List posts={post} userPost={userPost} />
			{modal?.type && <Modal />}
		</Layout>
	);
};

export default memo(App);
