import { useEffect } from 'react';

import storyApi from './api';
import { Footer, List, ModalLayout, Navbar } from './components/layout/';
import useBreakpoint from './hooks/useBreakpoint';
import useStore, { user } from './store';

const App = () => {
	const isMobile = useBreakpoint(768);
	const token = useStore((state) => state.token);
	const theme = useStore((state) => state.theme);
	const dark = useStore((state) => state.dark);

	useEffect(() => {
		storyApi.defaults.headers['Authorization'] = token;
	}, [token]);

	useEffect(() => {
		document.documentElement.className = `${theme}${dark ? ' dark' : ''}`;
	}, [dark, theme]);

	useEffect(() => {
		user.start();
	}, []);

	return (
		<>
			<Navbar isMobile={isMobile} />
			<List />
			<Footer isMobile={isMobile} />
			<ModalLayout />
		</>
	);
};

export default App;
