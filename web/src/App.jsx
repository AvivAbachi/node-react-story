import { useEffect } from 'react';
import { useInterval } from 'react-interval-hook';
import { Layout, List, Modal } from './components';
import useStore, { getAccess, getPost } from './store';

const App = () => {
	const { start, stop } = useInterval(getPost, 2500_000000, {
		autoStart: true,
		immediate: true,
	});

	useEffect(() => {
		useStore.setState({ interval: { start, stop } });
		getAccess();
	}, [start, stop]);

	return (
		<Layout>
			<List />
			<Modal />
		</Layout>
	);
};

export default App;
