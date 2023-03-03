import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Modal } from './components/base';

import { Footer, List, ModalLayout, Navbar } from './components/layout/';
import useStore, { getAccess, getPost, setModal } from './store';

const App = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const { type, data } = useStore((state) => state.modal);
	const close = () => setModal();

	useEffect(() => {
		getPost();
		getAccess();
	}, []);

	return (
		<>
			<Navbar isMobile={isMobile} />
			<List />
			<Modal open={!!type} onClose={close}>
				{type === 'RESET_SUCCESS' ? (
					<ModalLayout.ResetSuccessModal password={data?.password} />
				) : type === 'DELETE_POST' ? (
					<ModalLayout.DeletePostModal postId={data.postId} onClose={close} />
				) : type === 'THEME' ? (
					<ModalLayout.ThemeModal onClose={close} />
				) : (
					<ModalLayout.FormModal type={type} data={data} onClose={close} />
				)}
			</Modal>
			<Footer isMobile={isMobile} />
		</>
	);
};

export default App;
