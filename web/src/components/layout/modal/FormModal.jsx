import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	createPost,
	login,
	modalData,
	reset,
	setModal,
	signup,
	update,
	updatePost,
} from '../../../store';
import * as inputsValidator from '../../../utils/inputsValidator';
import { Button, Input, Modal } from '../../base';

function FormModal({ type, data, onClose }) {
	const {
		clearErrors,
		register,
		handleSubmit,
		setError,
		setValue,
		unregister,
		formState,
	} = useForm();
	const [wait, setWait] = useState(false);
	const { title, action, inputs } = modalData[type];

	useEffect(() => {
		if (type === 'UPDATE_POST') {
			setValue('title', data?.title);
			setValue('body', data?.body);
		} else if (type === 'LOGIN') {
			setValue('username', data?.username);
			setValue('password', data?.password);
			unregister('email');
		} else if (type === 'RESET') unregister('password');
	}, []);

	const onSubmit = async (form) => {
		setWait(true);
		try {
			if (type === 'SIGNUP') await signup(form);
			else if (type === 'LOGIN') await login(form);
			else if (type === 'UPDATE') await update(form);
			else if (type === 'RESET')
				await reset(form).then((user) => setModal('RESET_SUCCESS', user));
			else if (type === 'CREATE_POST') await createPost(form);
			else if (type === 'UPDATE_POST') await updatePost({ ...form, postId: data.postId });
			if (type !== 'RESET') onClose();
		} catch (err) {
			if (err.message === 'Network Error') {
				setError('server', {
					type: 'response',
					message: 'Network error, please try again later',
				});
			} else {
				err?.response?.data?.forEach((err) => {
					setError(err.param, { type: 'response', message: err.msg });
				});
			}
		}
		setWait(false);
	};

	return (
		<Modal.Content>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header title={title} onClose={onClose} />
				<Modal.Body>
					{inputs?.map((type) => {
						const { rule, name, ...input } = inputsValidator[type];
						return (
							<Input
								key={name}
								required={!!rule.required}
								error={formState.errors[name]?.message}
								{...register(name, { ...rule })}
								{...input}
							/>
						);
					})}
					{type === 'LOGIN' && (
						<ResetBtn title='Reset Password' onClick={() => setModal('RESET')} />
					)}
					{type === 'RESET' && (
						<ResetBtn title='Back to login' onClick={() => setModal('LOGIN')} />
					)}
					{formState.errors?.server && (
						<div className='mx-3'>
							<Input.InputError error={formState.errors.server?.message} />
						</div>
					)}
				</Modal.Body>
				<Modal.Footer onClose={onClose}>
					<Button type='submit' disabled={wait} onClick={() => clearErrors('server')}>
						{action}
					</Button>
				</Modal.Footer>
			</form>
		</Modal.Content>
	);
}

function ResetBtn({ title, onClick }) {
	return (
		<div className='reset-password'>
			<button type='button' onClick={onClick}>
				{title}
			</button>
		</div>
	);
}
export default FormModal;
