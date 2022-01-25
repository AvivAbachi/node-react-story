import { memo, useEffect, useRef } from 'react';
import { Header, List, Modal } from './components';
import useStore from './store';
import { useInterval } from 'react-interval-hook';
import axios from 'axios';

const App = () => {
	const { start, stop } = useInterval(() => getPost.current(), 2500, { autoStart: true, immediate: true });

	const getAccess = useRef(useStore.getState().getAccess);
	const getPost = useRef(useStore.getState().getPost);
	const modal = useStore((state) => state.modal.type);
	const token = useStore((state) => state.token);
	useEffect(() => {
		useStore.setState({ start, stop });
		axios.defaults.headers['x-access-token'] = token;
		getAccess.current();
	}, []);

	useEffect(() => {
		axios.defaults.headers['x-access-token'] = token;
	}, [token]);

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
