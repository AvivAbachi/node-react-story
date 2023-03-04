import { useEffect } from 'react';

import { Footer, List, ModalLayout, Navbar } from './components/layout/';
import useBreakpoint from './hooks/useBreakpoint';
import { user } from './store';

const App = () => {
	const isMobile = useBreakpoint(768);

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
