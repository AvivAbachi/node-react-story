import { forwardRef, memo, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// import { DevTool } from '@hookform/devtools';

import { Btn, Icons, Input, InputError } from '.';
import { ModalContext, UserContext, PostContext } from '../hooks';

const Portal = (Component, el) =>
	memo(function Portal() {
		return createPortal(<Component />, el);
	});

const Modal = () => {
	const { modal, form, handelModal, resetSuccess, resetPassword } = useContext(ModalContext);
	const useUser = useContext(UserContext);
	const usePost = useContext(PostContext);

	const {
		clearErrors,
		control,
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = form;

	const [wait, setWait] = useState(false);

	useEffect(() => {
		document.querySelector('body').style.overflow = 'hidden';
		setTimeout(() => {
			document.querySelector('.modal').style.opacity = 1;
		}, 1);
	}, []);

	const onClose = async () => {
		document.querySelector('.modal').style.opacity = 0;
		setTimeout(() => {
			document.querySelector('body').style.overflow = 'auto';
			handelModal();
		}, 300);
	};

	const onSubmit = async (data) => {
		setWait(true);
		try {
			switch (modal.type) {
				case 'SIGNUP':
					await useUser.singup(data).then(() => onClose());
					break;
				case 'LOGIN':
					await useUser.login(data).then(() => onClose());
					break;
				case 'UPDATE':
					await useUser.update(data).then(() => onClose());
					break;
				case 'RESET':
					await useUser.reset(data).then((user) => handelModal('RESET_SUCCESS', user));
					break;
				case 'CREATE_POST':
					await usePost.createPost(data).then(() => onClose());
					break;
				case 'UPDATE_POST':
					await usePost.updatePost({ id: modal.id, ...data }).then(() => onClose());
					break;
				case 'DELETE_POST':
					await usePost.deletePost({ id: modal.id }).then(() => onClose());
					break;
			}
		} catch (err) {
			if (err.message === 'Network Error') {
				setError('server', { type: 'response', message: 'Network error, please try again later' });
			} else {
				err.response?.data?.forEach((err) => {
					setError(err.param, { type: 'response', message: err.msg });
				});
			}
		} finally {
			setWait(false);
		}
	};

	return (
		<div className='modal' style={{ opacity: 0 }}>
			<div className='modal-backdrop' onClick={onClose} />
			<div className='modal-content'>
				<div className='modal-header'>
					<div className='modal-title'>{modal.title}</div>
					<Btn icon onClick={onClose}>
						<Icons.CloseIcon />
					</Btn>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* {wait ? 'pls wait' : 'ready'} */}
					{/* <DevTool control={control} /> */}
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
					{modal.type === 'DELETE_POST' && (
						<div className='text-center'>
							<p>Deleteing this post will be permanently!</p>
						</div>
					)}
					{errors?.server && (
						<div className='mx-3'>
							<InputError error={errors.server?.message} />
						</div>
					)}
					<div className='modal-footer'>
						<Btn type='button' onClick={onClose}>
							Cancel
						</Btn>
						<Btn type='submit' active disabled={wait} onClick={modal.type === 'RESET_SUCCESS' ? resetSuccess : () => clearErrors('server')}>
							{modal.type === 'RESET_SUCCESS' ? 'Login' : modal.type === 'DELETE_POST' ? 'Delete' : 'Submit'}
						</Btn>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Portal(memo(Modal), document.querySelector('#modal'));
