import { createContext, memo, useState } from 'react';
import { username, password, newPassword, email, show, title, body } from '../utils/inputs-validator';

const useModal = () => {
	const [modal, setModal] = useState({ type: null });

	// UI
	const closeModal = () => {
		setModal({ type: null });
	};
	const signupModal = () => {
		setModal({ type: 'SIGNUP', title: 'Sing Up', inputs: [username, password, email, show] });
	};
	const loginModal = () => {
		setModal({ type: 'LOGIN', title: 'Login', inputs: [username, password] });
	};
	const resetModal = () => {
		setModal({ type: 'RESET', title: 'Reset Password', inputs: [username, email] });
	};
	const resetSuccessModal = async ({ username, password }) => {
		setModal({ type: 'RESET_SUCCESS', title: 'Reset password Success', inputs: [], username, password });
	};
	const updateUserModal = () => {
		setModal({ type: 'UPDATE', title: 'Update User', inputs: [password, newPassword, email, show] });
	};
	const createPostModal = () => {
		setModal({ type: 'CREATE_POST', title: 'Create New Post', inputs: [title, body] });
	};
	const updatePostModal = () => {
		setModal({ type: 'UPDATE_POST', title: 'Change Post', inputs: [title, body] });
	};

	return {
		modal,
		closeModal,
		signupModal,
		loginModal,
		resetModal,
		resetSuccessModal,
		updateUserModal,
		createPostModal,
		updatePostModal,
	};
};

export const ModalContext = createContext(useModal);

const ModalProvider = ({ children }) => {
	const modal = useModal();
	return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
};

export default memo(ModalProvider);
