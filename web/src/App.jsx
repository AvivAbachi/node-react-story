import { useEffect } from 'react';

import { Modal } from './components/base';
import { Footer, List, ModalLayout, Navbar } from './components/layout/';
import useBreakpoint from './hooks/useBreakpoint';
import useStore, { getAccess, getPost, setModal } from './store';

const close = () => setModal();

const App = () => {
	const { type, data } = useStore((state) => state.modal);
	const isMobile = useBreakpoint(768);

	useEffect(() => {
		getPost();
		getAccess();
	}, []);

	return (
		<>
			<Navbar isMobile={isMobile} />
			<List />
			<Modal open={!!type} onClose={close}>
				{type === 'THEME' ? (
					<ModalLayout.ThemeModal onClose={close} />
				) : type === 'RESET_SUCCESS' ? (
					<ModalLayout.ResetSuccessModal password={data?.password} />
				) : (
					<ModalLayout.FormModal type={type} data={data} onClose={close} />
				)}
			</Modal>
			<Footer isMobile={isMobile} />
		</>
	);
};

export default App;
