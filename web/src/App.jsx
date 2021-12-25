import { memo, useContext } from 'react';
import { Layout, List, Modal } from './components';
import { ModalContext } from './hooks';

const App = () => {
	const { modal } = useContext(ModalContext);

	return (
		<Layout>
			<List />
			{modal?.type && <Modal />}
		</Layout>
	);
};

export default memo(App);
