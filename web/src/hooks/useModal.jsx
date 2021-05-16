import { useState } from 'react';
import { username, password, newPassword, email, show, title, body } from '../utils/inputs-validator';

export const ModalAction = {
	HIDE: { type: null },
	SIGNUP: { type: 'SIGNUP', title: 'Sing Up', inputs: [username, password, email, show] },
	LOGIN: { type: 'LOGIN', title: 'Login', inputs: [username, password] },
	RESET: { type: 'RESET', title: 'Reset Password', inputs: [username, email] },
	RESET_SUCCESS: { type: 'RESET_SUCCESS', title: 'Reset password Success', inputs: [] },
	UPDATE: { type: 'UPDATE', title: 'Update User', inputs: [password, newPassword, email, show] },
	CREATE_POST: { type: 'CREATE_POST', title: 'Create New Post', inputs: [title, body] },
	UPDATE_POST: { type: 'UPDATE_POST', title: 'Change Post', inputs: [title, body] },
};

export const useModal = () => {
	const [modal, setModal] = useState(ModalAction.HIDE);

	const closeModal = () => {
		setModal(ModalAction.HIDE);
	};
	const signupModal = () => {
		setModal(ModalAction.SIGNUP);
	};
	const loginModal = () => {
		setModal(ModalAction.LOGIN);
	};
	const resetModal = () => {
		setModal(ModalAction.RESET);
	};
	const resetSuccessModal = async ({ username, password }) => {
		const successModal = { ...ModalAction.RESET_SUCCESS, username, password };
		setModal(successModal);
	};
	const updateUserModal = () => {
		setModal(ModalAction.UPDATE);
	};
	const createPostModal = () => {
		setModal(ModalAction.CREATE_POST);
	};

	return {
		modal,
		setModal,
		closeModal,
		signupModal,
		loginModal,
		resetModal,
		resetSuccessModal,
		updateUserModal,
		createPostModal,
	};
};
