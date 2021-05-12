import { useState } from 'react';
import ModalAction from './ModalAction';

export const useUI = () => {
	const [isUserPost, setIsUserPost] = useState(false);
	const [modal, setModal] = useState(ModalAction.HIDE);

	const toggleUserPost = () => {
		setIsUserPost((userPost) => !userPost);
	};
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
		isUserPost,
		modal,
		setModal,
		toggleUserPost,
		closeModal,
		signupModal,
		loginModal,
		resetModal,
		resetSuccessModal,
		updateUserModal,
		createPostModal,
	};
};
