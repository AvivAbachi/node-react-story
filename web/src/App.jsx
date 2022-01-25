import { memo, useEffect } from 'react';
import { Header, List, Modal } from './components';
import useStore, { selector } from './store';
import { useInterval } from 'react-interval-hook';
import useLocalStorage from '@d2k/react-localstorage';

const App = () => {
	const { start, stop } = useInterval(() => getPost(), 25000000, { autoStart: true, immediate: true });
	const [token, setToken, removeToken] = useLocalStorage('x-access-token');

	const getAccess = useStore.getState().getAccess;
	const getPost = useStore.getState().getPost;
	const modal = useStore(selector.type);
	useEffect(() => {
		useStore.setState({ start, stop, token, setToken, removeToken });
		start();
		getAccess();
	}, []);

	return (
		<>
			<Header />
			<List />
			{modal && <Modal />}
			<footer> © Copyright 2021. All Rights Reserved.</footer>
		</>
	);
};

export default memo(App);
