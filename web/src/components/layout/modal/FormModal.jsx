import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { modal } from '../../../store';
import * as inputsValidator from '../../../utils/inputsValidator';
import { Button, Input, Modal } from '../../base';

function FormModal({ type, data, onClose }) {
	const {
		clearErrors,
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors },
	} = useForm();

	const [wait, setWait] = useState(false);
	const { title, action, inputs, submit } = useMemo(() => modal.modalData[type], [type]);

	useEffect(() => {
		switch (type) {
			case 'LOGIN':
				if (data?.username) setValue('username', data.username);
				if (data?.password) setValue('password', data.password);
				break;
			case 'UPDATE_POST':
				setValue('title', data.title);
				setValue('body', data.body);
				break;
		}
	}, [data, setValue, type]);

	const onSubmit = useCallback(
		async (form) => {
			setWait(true);
			try {
				if (type === 'UPDATE_POST' || type === 'DELETE_POST') form.postId = data.postId;
				await submit(form);
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
		},
		[onClose, setError, submit, type, data]
	);

	return (
		<Modal.Content>
			<Modal.Header title={title} onClose={onClose} />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Body>
					{inputs?.map((type) => {
						const { rule, name, ...input } = inputsValidator[type];
						return (
							<Input
								key={name}
								required={!!rule.required}
								error={errors[name]?.message}
								{...register(name, { ...rule })}
								{...input}
							/>
						);
					})}
					{type === 'LOGIN' && (
						<ResetBtn title='Reset Password' onClick={() => modal.setModal('RESET')} />
					)}
					{type === 'RESET' && (
						<ResetBtn title='Back to login' onClick={() => modal.setModal('LOGIN')} />
					)}
					{type === 'DELETE_POST' && (
						<p className='mt-6'>Deleting this post will be permanently!</p>
					)}
					{errors?.server && (
						<div className='mx-3'>
							<Input.InputError error={errors.server?.message} />
						</div>
					)}
				</Modal.Body>
				<Modal.Footer onClose={onClose}>
					<Button
						active
						type='submit'
						disabled={wait}
						onClick={() => clearErrors('server')}
					>
						{action}
					</Button>
				</Modal.Footer>
			</form>
		</Modal.Content>
	);
}

function ResetBtn({ title, onClick }) {
	return (
		<div className='mt-4 text-center'>
			<button
				className='mx-auto cursor-pointer rounded-full py-2 px-4 font-medium text-gray-500 ring-2 ring-transparent hover:text-primary focus:text-primary focus:outline-none focus:ring-primary'
				type='button'
				onClick={onClick}
			>
				{title}
			</button>
		</div>
	);
}

export default FormModal;
