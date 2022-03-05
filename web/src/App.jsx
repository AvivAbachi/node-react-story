import {memo, useEffect} from 'react';
import {useInterval} from 'react-interval-hook';
import {Layout, List, Modal} from './components';
import useStore, {getAccess, getPost} from './store';

const App = () => {
	const {start, stop} = useInterval(getPost, 2500, {autoStart: true, immediate: true});

	useEffect(() => {
		useStore.setState({interval: {start, stop}});
		getAccess();
	}, []);

	return (
		<Layout>
			<List />
			<Modal />
		</Layout>
	);
};

export default memo(App);
