import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { Btn, Icons, Input } from '.';
import useStore, {
	setModal,
	createPost,
	deletePost,
	updatePost,
	signup,
	login,
	update,
	reset,
	themeData,
	modalData,
} from '../store';
import inputsValidator from '../utils/inputsValidator';

// Form
// 	SIGNUP
// 	LOGIN
// 	RESET
// 	UPDATE
// 	CREATE_POST
// 	UPDATE_POST
// Action
// 	THEME
// 	DELETE_POST
// 	RESET_SUCCESS

function _Portal(Component, el) {
	return function Portal() {
		const modal = useStore((state) => state.modal);
		return modal.type ? createPortal(<Component {...modal} />, el) : null;
	};
}

function ModalSelector({ type, data }) {
	if (
		type === 'SIGNUP' ||
		type === 'LOGIN' ||
		type === 'RESET' ||
		type === 'UPDATE' ||
		type === 'CREATE_POST' ||
		type === 'UPDATE_POST'
	)
		return <FormModal type={type} data={data} />;
	else if (type === 'RESET_SUCCESS')
		return <ResetSuccessModal password={data?.password} />;
	else if (type === 'DELETE_POST') return <DeletePostModal />;
	else if (type === 'THEME') return <ThemeModal />;
}

function Modal({
	children,
	title,
	action,
	form,
	onAction,
	disabel,
	close,
	closeState,
}) {
	useEffect(() => {
		document.querySelector('body').style.overflow = 'hidden';
		return async () => {
			document.querySelector('body').style.overflow = null;
		};
	}, []);

	useEffect(() => {
		if (closeState) closeModal();
	}, [closeState]);

	const closeModal = async () => {
		setTimeout(() => setModal(), 110);
	};

	return (
		<div className='modal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<div className='modal-title'>{title}</div>
					<Btn icon onClick={closeModal} type={form ? 'button' : undefined}>
						<Icons.CloseIcon />
					</Btn>
				</div>
				{children}
				<div className='modal-footer'>
					<Btn onClick={closeModal} type={form ? 'button' : undefined}>
						{close || 'Close'}
					</Btn>
					{onAction && (
						<Btn
							type={form ? 'submit' : undefined}
							active
							disabled={disabel}
							onClick={onAction}
						>
							{action}
						</Btn>
					)}
				</div>
			</div>
			<div className='modal-backdrop' onClick={closeModal} />
		</div>
	);
}

function FormModal({ type, data }) {
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
	const [done, setDone] = useState(false);
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
			else if (type === 'UPDATE_POST')
				await updatePost({ ...form, id: data.id });
			if (type !== 'RESET') setDone(true);
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				closeState={done}
				title={title}
				action={action}
				form
				disabled={wait}
				onAction={() => clearErrors('server')}
				close='Cancel'
			>
				<div className='modal-body'>
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
					{type === 'LOGIN' ? (
						<ResetBtn
							title='Reset Password'
							onClick={() => setModal('RESET')}
						/>
					) : type === 'RESET' ? (
						<ResetBtn title='Back to login' onClick={() => setModal('LOGIN')} />
					) : null}
				</div>
				{formState.errors?.server && (
					<div className='mx-3'>
						<Input.InputError error={formState.errors.server?.message} />
					</div>
				)}
			</Modal>
		</form>
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

function ResetSuccessModal({ password }) {
	return (
		<Modal
			title='Reset Password Success'
			action='Login'
			onAction={() => setModal('LOGIN')}
			close='Cancel'
		>
			<div className='text-center'>
				<h3 className='text-xl font-semibold text-gray-500 tracking-wide'>
					Your new Password
				</h3>
				<h2 className='text-3xl mt-2 mb-4 text-primary font-semibold'>
					{password}
				</h2>
			</div>
		</Modal>
	);
}

function DeletePostModal() {
	const [wait, setWait] = useState(false);
	const [done, setDone] = useState(false);
	const [error, setError] = useState();

	const handelDelete = async () => {
		setWait(true);
		setError();
		try {
			await deletePost({ id: data.id });
			setDone(true);
		} catch (err) {
			setError('Post id is not allowed');
		}
		setWait(false);
	};

	return (
		<Modal
			closeState={done}
			title='Delete Post'
			action='Delete Post'
			onAction={handelDelete}
			disabled={wait}
			close='Cancel'
		>
			<div className='text-center'>
				<p>Deleting this post will be permanently!</p>
			</div>
			{error && (
				<div className='mx-3'>
					<Input.InputError error={error} />
				</div>
			)}
		</Modal>
	);
}

function ThemeModal() {
	const dark = useStore((state) => state.dark);
	const theme = useStore((state) => state.theme);
	return (
		<Modal title='Theme Colors'>
			<div className='modal-body'>
				<label htmlFor='dark' className='input-label'>
					Dark Theme
				</label>
				<input
					type='checkbox'
					name='dark'
					checked={dark}
					onChange={() => useStore.setState({ dark: !dark })}
				/>
				<div
					className='toggle'
					onClick={() => useStore.setState({ dark: !dark })}
				></div>
				<label htmlFor='colors' className='input-label'>
					Color Themes
				</label>
				{Object.entries(themeData).map(([name, color]) => (
					<input
						key={name}
						type='radio'
						name='colors'
						className={color}
						checked={theme === name}
						onChange={() => useStore.setState({ theme: name })}
					/>
				))}
			</div>
		</Modal>
	);
}

export default _Portal(ModalSelector, document.querySelector('#modal'));
