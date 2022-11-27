import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input, ModalBase, ModalPortal } from './index';
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

function ModalLayout({ type, data }) {
	if (type === 'RESET_SUCCESS') return <ResetSuccessModal password={data?.password} />;
	else if (type === 'DELETE_POST') return <DeletePostModal />;
	else if (type === 'THEME') return <ThemeModal />;
	else return <FormModal type={type} data={data} />;
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
			else if (type === 'UPDATE_POST') await updatePost({ ...form, id: data.id });
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
			<ModalBase
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
					{type === 'LOGIN' && (
						<ResetBtn title='Reset Password' onClick={() => setModal('RESET')} />
					)}
					{type === 'RESET' && (
						<ResetBtn title='Back to login' onClick={() => setModal('LOGIN')} />
					)}
				</div>
				{formState.errors?.server && (
					<div className='mx-3'>
						<Input.InputError error={formState.errors.server?.message} />
					</div>
				)}
			</ModalBase>
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
		<ModalBase
			title='Reset Password Success'
			action='Login'
			onAction={() => setModal('LOGIN')}
			close='Cancel'
		>
			<div className='text-center'>
				<h3 className='text-xl font-semibold tracking-wide text-gray-500'>
					Your new Password
				</h3>
				<h2 className='mt-2 mb-4 text-3xl font-semibold text-primary'>{password}</h2>
			</div>
		</ModalBase>
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
		<ModalBase
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
		</ModalBase>
	);
}

function ThemeModal() {
	const dark = useStore((state) => state.dark);
	const theme = useStore((state) => state.theme);
	return (
		<ModalBase title='Theme Colors'>
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
				<div className='toggle' onClick={() => useStore.setState({ dark: !dark })}></div>
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
		</ModalBase>
	);
}

export default ModalPortal(ModalLayout, document.querySelector('#modal'));
