import { forwardRef, memo } from 'react';
import { Icons } from '.';

const Input = forwardRef(({ onChange, onBlur, title, name, type, error, textarea }, ref) => {
	return (
		<>
			<label className='input-label'>{title || name}</label>
			{textarea ? (
				<textarea className='input' name={name} ref={ref} onChange={onChange} onBlur={onBlur} rows={4} />
			) : (
				<input className='input' type={type} name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
			)}
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
