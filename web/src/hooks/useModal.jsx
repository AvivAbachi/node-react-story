import { createContext, useState } from 'react';
import { username, password, newPassword, email, show, title, body } from '../utils/inputs-validator';
import { useForm } from 'react-hook-form';

const useModal = () => {
	const [modal, setModal] = useState({ type: null });
	const form = useForm();

	const resetPassword = () => {
		if (modal.type === 'LOGIN') {
			handelModal('RESET');
			form.unregister('password');
		} else {
			handelModal('LOGIN');
			form.unregister('email');
		}
	};

	const resetSuccess = () => {
		const { username, password } = modal;
		handelModal('LOGIN');
		form.setValue('username', username);
		form.setValue('password', password);
	};

	const handelModal = (mode, data) => {
		switch (mode) {
			case 'SIGNUP':
				setModal({ type: 'SIGNUP', title: 'Sing Up', inputs: [username, password, email, show] });
				break;
			case 'LOGIN':
				setModal({ type: 'LOGIN', title: 'Login', inputs: [username, password] });
				break;
			case 'RESET':
				setModal({ type: 'RESET', title: 'Reset Password', inputs: [username, email] });
				break;
			case 'RESET_SUCCESS':
				setModal({ type: 'RESET_SUCCESS', title: 'Reset password Success', username: data.username, password: data.password });
				break;
			case 'UPDATE':
				setModal({ type: 'UPDATE', title: 'Update User', inputs: [password, newPassword, email, show] });
				break;
			case 'CREATE_POST':
				setModal({ type: 'CREATE_POST', title: 'Create New Post', inputs: [title, body] });
				break;
			case 'UPDATE_POST':
				setModal({ type: 'UPDATE_POST', title: 'Change Post', inputs: [title, body], id: data.id });
				form.setValue('title', data.title);
				form.setValue('body', data.body);
				break;
			case 'DELETE_POST':
				setModal({ type: 'DELETE_POST', title: 'Delete Post', id: data.id });
				break;
			default:
				setModal({ type: null });
				break;
		}
	};

	return {
		modal,
		form,
		setModal,
		handelModal,
		resetPassword,
		resetSuccess,
	};
};

export const ModalContext = createContext(useModal);

const ModalProvider = ({ children }) => {
	const modal = useModal();
	return <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
