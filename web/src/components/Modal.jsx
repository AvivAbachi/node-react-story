import { memo, useEffect, useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Btn, Icons, Input, InputError } from '.';
import useStore from '../store';
import inputsValidator from '../utils/inputsValidator';
// import { DevTool } from '@hookform/devtools';

const Portal = (Component, el) =>
	function Portal() {
		return createPortal(<Component />, el);
	};

const Modal = () => {
	const [wait, setWait] = useState(false);
	const modal = useStore((state) => state.modal);

	const signup = useRef(useStore.getState().signup);
	const login = useRef(useStore.getState().login);
	const update = useRef(useStore.getState().update);
	const reset = useRef(useStore.getState().reset);
	const createPost = useRef(useStore.getState().createPost);
	const updatePost = useRef(useStore.getState().updatePost);
	const deletePost = useRef(useStore.getState().deletePost);
	const handelModal = useRef(useStore.getState().handelModal);
	const resetSuccess = useRef(useStore.getState().resetSuccess);
	const resetPassword = useRef(useStore.getState().resetPassword);

	const {
		clearErrors,
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
		unregister,
	} = useForm();

	useEffect(() => {
		switch (modal.type) {
			case 'UPDATE_POST':
				setValue('title', modal.title);
				setValue('body', modal.body);
				break;
			case 'RESET':
				unregister('password');
				break;
			case 'LOGIN':
				setValue('username', modal.username);
				setValue('password', modal.password);
				unregister('email');
				break;
			default:
				break;
		}

		document.querySelector('body').style.overflow = 'hidden';
		setTimeout(() => {
			document.querySelector('.modal').style.opacity = 1;
		}, 1);
	}, []);

	const onClose = async () => {
		document.querySelector('.modal').style.opacity = 0;
		setTimeout(() => {
			document.querySelector('body').style.overflow = null;
			handelModal.current();
		}, 300);
	};
	const inputs = useCallback(() => {
		return modal.inputs.map((type) => {
			const { rule, name, ...input } = inputsValidator[type];
			return <Input key={name} {...register(name, { ...rule })} {...input} error={errors[name]?.message} />;
		});
	}, [modal.inputs, errors]);

	const onSubmit = async (data) => {
		setWait(true);
		try {
			switch (modal.type) {
				case 'SIGNUP':
					await signup.current(data).then(() => onClose());
					break;
				case 'LOGIN':
					await login.current(data).then(() => onClose());
					break;
				case 'UPDATE':
					await update.current(data).then(() => onClose());
					break;
				case 'RESET':
					await reset.current(data).then((user) => handelModal.current('RESET_SUCCESS', user));
					break;
				case 'CREATE_POST':
					await createPost.current(data).then(() => onClose());
					break;
				case 'UPDATE_POST':
					await updatePost.current({ id: modal.id, ...data }).then(() => onClose());
					break;
				case 'DELETE_POST':
					await deletePost.current({ id: modal.id }).then(() => onClose());
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
					<div className='modal-body'>
						{/* <DevTool control={control} /> */}
						{inputs()}
						{(modal.type === 'LOGIN' || modal.type === 'RESET') && (
							<div className='reset-password'>
								<button type='button' onClick={resetPassword.current}>
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
							<p>Deleting this post will be permanently!</p>
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
						<Btn
							type='submit'
							active
							disabled={wait}
							onClick={modal.type === 'RESET_SUCCESS' ? resetSuccess.current : () => clearErrors('server')}>
							{modal.type === 'RESET_SUCCESS' ? 'Login' : modal.type === 'DELETE_POST' ? 'Delete' : 'Submit'}
						</Btn>
					</div>
				</form>
			</div>
		</div>
	);
};

export default memo(Portal(memo(Modal), document.querySelector('#modal')));
