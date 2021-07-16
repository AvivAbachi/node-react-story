import { forwardRef, memo } from 'react';
import { Icons } from '.';

const Input = forwardRef(({ onChange, onBlur, title, name, type, error }, ref) => {
	return (
		<>
			<label className='input-label'>{title || name}</label>
			<input className='input' type={type} name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
			{error && <InputError error={error} />}
		</>
	);
});

export const InputError = memo(function InputError({ error }) {
	return (
		<div className='input-error' title={error}>
			<Icons.ErrorIcon />
			{error}
		</div>
	);
});

export default memo(Input);
