import React, { memo, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';

import ModalAction from '../hooks/ModalAction';

import { Btn, Input, InputError } from '.';
import { CloseIcon } from './Icons';
import { PostContext, UIContext, UserContext } from '../App';

const ModalPortal = (Component) => {
	return function ModalPortal() {
		const { modal } = useContext(UIContext);
		const el = document.getElementById('modal');
		return modal.type ? createPortal(<Component />, el) : null;
	};
};

const Modal = memo(function Modal() {
	const { modal, closeModal, loginModal, resetModal } = useContext(UIContext);
	const { singup, login, update, reset } = useContext(UserContext);
	const { createPost } = useContext(PostContext);
	const [wait, setWait] = useState(false);

	const { register, handleSubmit, errors, unregister, setError, setValue } = useForm();

	useEffect(() => {
		document.querySelector('body').style.overflow = 'hidden';
		return () => {
			document.querySelector('body').style.overflow = 'auto';
		};
	}, []);

	const resetPassword = () => {
		if (modal.type === ModalAction.LOGIN.type) {
			resetModal();
			unregister('password');
		} else {
			loginModal();
			unregister('email');
		}
	};

	const loginFromReset = async () => {
		const { username, password } = modal;
		await loginModal();
		setValue('username', username);
		setValue('password', password);
	};

	const onSubmit = async (data) => {
		try {
			setWait(true);
			switch (modal.type) {
				case ModalAction.SINGUP.type:
					await singup(data);
					break;
				case ModalAction.LOGIN.type:
					await login(data);
					break;
				case ModalAction.UPDATE.type:
					await update(data);
					break;
				case ModalAction.RESET.type:
					await reset(data);
					break;
				case ModalAction.CREATE_POST.type:
					await createPost(data);
					break;
				case ModalAction.UPDATE_POST.type:
					// await updatePost(data)
					break;
				default:
					closeModal();
					break;
			}
			setWait(false);
		} catch (err) {
			setWait(false);
			if (err.message === 'Network Error') {
				setError('server', { type: 'response', message: 'Network error, please try again later' });
			} else {
				err.response?.data.forEach((err) => setError(err.param, { type: 'response', message: err.msg }));
			}
		}
	};

	return (
		<div className='modal'>
			<div className='modal-backdrop' onClick={closeModal} />
			<div className='modal-content'>
				<div className='modal-header'>
					<div className='modal-title'>{modal.title}</div>
					<Btn icon onClick={closeModal}>
						<CloseIcon />
					</Btn>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* {wait ? 'pls wait' : 'ready'} */}
					<div className='modal-body'>
						{modal.inputs.map(({ rule, ...input }) => (
							<Input key={input.name} ref={register({ ...rule })} {...input} error={errors[input.name]?.message} />
						))}
						{(modal.type === ModalAction.LOGIN.type || modal.type === ModalAction.RESET.type) && (
							<div className='reset-password'>
								<button type='button' onClick={resetPassword}>
									{modal.type === ModalAction.LOGIN.type ? 'Reset password' : 'Back to login'}
								</button>
							</div>
						)}
					</div>
					{modal.type === ModalAction.RESET_SUCCESS.type && (
						<div className='text-center'>
							<h3 className='text-xl font-semibold text-gray-500 tracking-wide'>Your Name Password</h3>
							<h2 className='text-3xl mt-2 mb-4 text-rose-500 font-semibold'>{modal.password}</h2>
						</div>
					)}
					{errors.server && (
						<div className='mx-3'>
							<InputError error={errors.server?.message} />
						</div>
					)}
					{modal.type === ModalAction.RESET_SUCCESS.type ? (
						<div className='modal-footer'>
							<Btn active onClick={loginFromReset}>
								Login
							</Btn>
						</div>
					) : (
						<div className='modal-footer'>
							<Btn type='button' onClick={closeModal}>
								Cancel
							</Btn>
							<Btn type='submit' active disabled={wait}>
								Submit
							</Btn>
						</div>
					)}
				</form>
				{/* <DevTool control={control} /> */}
			</div>
		</div>
	);
});

export default ModalPortal(Modal);
