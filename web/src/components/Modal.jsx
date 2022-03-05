import {memo, useEffect, useState, useCallback} from 'react';
import {createPortal} from 'react-dom';
import {useForm} from 'react-hook-form';
import {Btn, Icons, Input} from '.';
import useStore, {handelModal, createPost, deletePost, updatePost, signup, login, update, reset, themeSelector} from '../store';
import inputsValidator from '../utils/inputsValidator';

const _Portal = (Component, el) =>
	function Portal() {
		const type = useStore((state) => state.modal.type);
		return type ? createPortal(<Component />, el) : null;
	};

const Modal = () => {
	const [wait, setWait] = useState(false);
	const {type, title, inputs, data} = useStore((state) => state.modal);
	const {clearErrors, register, handleSubmit, setError, setValue, unregister, formState} = useForm();

	useEffect(() => {
		//document.querySelector('body').style.overflow = 'hidden';
		if (type === 'UPDATE_POST') {
			setValue('title', data?.title);
			setValue('body', data?.body);
		} else if (type === 'LOGIN') {
			setValue('username', data?.username);
			setValue('password', data?.password);
			unregister('email');
		} else if (type === 'RESET') unregister('password');
	}, []);

	const onClose = async () => {
		//document.querySelector('body').style.overflow = null;
		setTimeout(() => handelModal(), 0);
	};

	const inputsList = useCallback(() => {
		return inputs?.map((type) => {
			const {rule, name, ...input} = inputsValidator[type];
			return <Input key={name} required={!!rule.required} error={formState.errors[name]?.message} {...register(name, {...rule})} {...input} />;
		});
	}, [inputs, formState.errors]);

	const themeList = useCallback(() => {
		return Object.entries(themeSelector).map(([name, color]) => (
			<Btn key={name} icon active onClick={() => useStore.setState({theme: name})} className={`w-10 h-10 ${color}`}></Btn>
		));
	}, [themeSelector]);

	const onSubmit = async (form) => {
		setWait(true);
		try {
			if (type === 'SIGNUP') await signup(form);
			else if (type === 'LOGIN') await login(form);
			else if (type === 'UPDATE') await update(form);
			else if (type === 'RESET') await reset(form).then((user) => handelModal('RESET_SUCCESS', user));
			else if (type === 'CREATE_POST') await createPost(form);
			else if (type === 'UPDATE_POST') await updatePost({...form, id: data.id});
			else if (type === 'DELETE_POST') await deletePost({id: data.id});
			if (type !== 'RESET') await onClose();
		} catch (err) {
			if (err.message === 'Network Error') {
				setError('server', {type: 'response', message: 'Network error, please try again later'});
			} else if (type == 'DELETE_POST') {
				setError('server', {type: 'response', message: 'Post Id is not allowed'});
			} else {
				err?.response?.data?.forEach((err) => {
					setError(err.param, {type: 'response', message: err.msg});
				});
			}
		}
		setWait(false);
	};

	return (
		<div className='modal'>
			<div className='modal-backdrop' onClick={onClose} />
			<div className='modal-content'>
				<div className='modal-header'>
					<div className='modal-title'>{title}</div>
					<Btn icon onClick={onClose}>
						<Icons.CloseIcon />
					</Btn>
				</div>

				{type === 'UPDATE' && (
					<div>
						<label className='input-label'>Color Themes</label>
						{themeList()}
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* {wait ? 'pls wait' : 'ready'} */}
					<div className='modal-body'>
						{inputsList()}
						{(type === 'LOGIN' || type === 'RESET') && (
							<div className='reset-password'>
								<button type='button' onClick={() => handelModal(type === 'LOGIN' ? 'RESET' : 'LOGIN')}>
									{type === 'LOGIN' ? 'Reset password' : 'Back to login'}
								</button>
							</div>
						)}
					</div>
					{type === 'RESET_SUCCESS' && (
						<div className='text-center'>
							<h3 className='text-xl font-semibold text-gray-500 tracking-wide'>Your new Password</h3>
							<h2 className='text-3xl mt-2 mb-4 text-primary font-semibold'>{data?.password}</h2>
						</div>
					)}
					{type === 'DELETE_POST' && (
						<div className='text-center'>
							<p>Deleting this post will be permanently!</p>
						</div>
					)}
					{formState.errors?.server && (
						<div className='mx-3'>
							<Input.InputError error={formState.errors.server?.message} />
						</div>
					)}
					<div className='modal-footer'>
						<Btn type='button' onClick={onClose}>
							Cancel
						</Btn>
						<Btn type='submit' active disabled={wait} onClick={() => (type === 'RESET_SUCCESS' ? handelModal('LOGIN') : clearErrors('server'))}>
							{type === 'RESET_SUCCESS' ? 'Login' : type === 'DELETE_POST' ? 'Delete' : 'Submit'}
						</Btn>
					</div>
				</form>
			</div>
		</div>
	);
};

export default memo(_Portal(memo(Modal), document.querySelector('#modal')));
