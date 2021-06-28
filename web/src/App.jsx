import { memo, useContext } from 'react';
import { Layout, List, Modal } from './components';
import { PostContext, ModalContext } from './hooks';

const App = () => {
	const { modal } = useContext(ModalContext);
	const { post } = useContext(PostContext);

	return (
		<Layout>
			<List posts={post} />
			{modal?.type && <Modal />}
		</Layout>
	);
};

export default memo(App);
