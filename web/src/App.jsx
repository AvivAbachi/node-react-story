import { memo, useEffect } from 'react';
import { useInterval } from 'react-interval-hook';
import { Navbar, List, Modal } from './components';
import useStore, { getAccess, getPost } from './store';

const App = () => {
	const { start, stop } = useInterval(getPost, 2500000, { autoStart: true, immediate: true });

	useEffect(() => {
		useStore.setState({ interval: { start, stop } });
		getAccess();
	}, []);

	return (
		<>
			<Navbar />
			<List />
			<Modal />
			<footer>create by</footer>
		</>
	);
};

export default memo(App);
