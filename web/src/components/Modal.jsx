import { forwardRef, memo, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { Btn, Input, InputError } from '.';
import { CloseIcon } from './Icons';
import { ModalContext, UserContext, PostContext } from '../hooks';

const Portal = (Component, el) => () => createPortal(<Component />, el);

const Modal = () => {
	const { modal, closeModal, loginModal, resetModal } = useContext(ModalContext);
	const { singup, login, update, reset } = useContext(UserContext);
	const { createPost } = useContext(PostContext);

	const {
		clearErrors,
		control,
		register,
		handleSubmit,
		formState: { errors },
		unregister,
		setError,
		setValue,
	} = useForm();

	const [wait, setWait] = useState(false);

	useEffect(() => {
		document.querySelector('body').style.overflow = 'hidden';
		setTimeout(() => {
			document.querySelector('.modal').style.opacity = 1;
		}, 1);
	}, []);

	const resetPassword = () => {
		if (modal.type === 'LOGIN') {
			resetModal();
			unregister('password');
		} else {
			loginModal();
			unregister('email');
		}
	};

	const resetSuccess = async () => {
		const { username, password } = modal;
		await loginModal();
		setValue('username', username);
		setValue('password', password);
	};

	const onClose = () => {
		document.querySelector('.modal').style.opacity = 0;
		setTimeout(() => {
			document.querySelector('body').style.overflow = 'auto';
			closeModal();
		}, 300);
	};
	const onSubmit = async (data) => {
		try {
			setWait(true);
			switch (modal.type) {
				case 'SIGNUP':
					await singup(data);
					break;
				case 'LOGIN':
					await login(data);
					break;
				case 'UPDATE':
					await update(data);
					break;
				case 'RESET':
					await reset(data);
					break;
				case 'CREATE_POST':
					await createPost(data);
					break;
				case 'UPDATE_POST':
					await updatePost(data);
					break;
				default:
					onClose();
					break;
			}
			setWait(false);
		} catch (err) {
			setWait(false);
			if (err.message === 'Network Error') {
				setError('server', { type: 'response', message: 'Network error, please try again later' });
			} else {
				err.response?.data?.forEach((err) => {
					setError(err.param, { type: 'response', message: err.msg });
				});
			}
		}
	};

	return (
		<div className='modal' style={{ opacity: 0 }}>
			<div className='modal-backdrop' onClick={onClose} />
			<div className='modal-content'>
				<div className='modal-header'>
					<div className='modal-title'>{modal.title}</div>
					<Btn icon onClick={onClose}>
						<CloseIcon />
					</Btn>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					{wait ? 'pls wait' : 'ready'}
					<div className='modal-body'>
						{modal.inputs?.map(({ rule, name, ...input }) => (
							<Input key={name} {...register(name, { ...rule })} {...input} error={errors[name]?.message} />
						))}
						{(modal.type === 'LOGIN' || modal.type === 'RESET') && (
							<div className='reset-password'>
								<button type='button' onClick={resetPassword}>
									{modal.type === 'LOGIN' ? 'Reset password' : 'Back to login'}
								</button>
							</div>
						)}
					</div>
					{modal.type === 'RESET_SUCCESS' && (
						<div className='text-center'>
							<h3 className='text-xl font-semibold text-gray-500 tracking-wide'>Your new Password</h3>
							<h2 className='text-3xl mt-2 mb-4 text-rose-500 font-semibold'>{modal.password}</h2>
						</div>
					)}
					{errors?.server && (
						<div className='mx-3'>
							<InputError error={errors.server?.message} />
						</div>
					)}
					{modal.type === 'RESET_SUCCESS' ? (
						<div className='modal-footer'>
							<Btn active onClick={resetSuccess}>
								Login
							</Btn>
						</div>
					) : (
						<div className='modal-footer'>
							<Btn type='button' onClick={onClose}>
								Cancel
							</Btn>
							<Btn type='submit' active disabled={wait} onClick={() => clearErrors('server')}>
								Submit
							</Btn>
						</div>
					)}
				</form>
				<DevTool control={control} />
			</div>
		</div>
	);
};

export default Modal;
