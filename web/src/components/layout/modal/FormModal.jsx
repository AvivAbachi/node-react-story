import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Input, Modal } from '../../base/Index';

function FormModal({ title = 'Modal Title', action = 'Submit', inputs = [], data, autoClose = true, children, onSubmit, onClose }) {
	const {
		clearErrors,
		register,
		handleSubmit,
		setError,
		setValue,
		formState: { errors },
	} = useForm();

	const [wait, setWait] = useState(false);

	useEffect(() => {
		if (data) {
			Object.entries(data).forEach(([key, value]) => setValue(key, value));
		}
	}, [data, setValue]);

	const handelError = useCallback(
		(err) => {
			if (err.message === 'Network Error') {
				setError('server', {
					type: 'response',
					message: 'Network error, please try again later',
				});
			} else if (err.response.status === 401) {
				setError('server', {
					type: 'response',
					message: 'Invalid username or password',
				});
			} else {
				err?.response?.data?.forEach((err) => {
					setError(err.param, { type: 'response', message: err.msg });
				});
			}
		},
		[setError]
	);

	const submit = useCallback(
		async (form) => {
			setWait(true);
			try {
				await onSubmit?.(form);
				if (autoClose) onClose();
			} catch (err) {
				handelError(err);
			} finally {
				setWait(false);
			}
		},
		[autoClose, handelError, onClose, onSubmit]
	);

	return (
		<Modal.Content>
			<Modal.Header title={title} onClose={onClose} />
			<form onSubmit={handleSubmit(submit)}>
				<Modal.Body>
					{inputs?.map(({ rule, name, input }) => (
						<Input key={name} required={!!rule.required} error={errors[name]?.message} {...register(name, { ...rule })} {...input} />
					))}
					{children}
					{errors?.server && (
						<div className='mx-3'>
							<Input.Error error={errors.server.message} />
						</div>
					)}
				</Modal.Body>
				<Modal.Footer onClose={onClose}>
					<Button active type='submit' disabled={wait} onClick={() => clearErrors('server')}>
						{action}
					</Button>
				</Modal.Footer>
			</form>
		</Modal.Content>
	);
}

export function ResetButton({ title, onClick }) {
	return (
		<div className='mt-4 text-center'>
			<button className='mx-auto cursor-pointer rounded-full py-2 px-4 font-medium text-gray-500 ring-2 ring-transparent hover:text-primary focus:text-primary focus:outline-none focus:ring-primary' type='button' onClick={onClick}>
				{title}
			</button>
		</div>
	);
}

export default FormModal;
