import { useEffect } from 'react';
import { Layout, List, Modal } from './components';
import { getAccess, getPost } from './store';

const App = () => {
	useEffect(() => {
		getPost();
		getAccess();
	}, []);

	return (
		<Layout>
			<List />
			<Modal />
		</Layout>
	);
};

export default App;
