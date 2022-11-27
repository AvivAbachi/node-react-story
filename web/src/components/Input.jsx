import { forwardRef } from 'react';
import { Icons } from './index';

function Input({ error, textarea, required, ...props }, ref) {
	return (
		<label className='input-label'>
			{required && <span>{'* '}</span>}
			{props.title || props.name}
			{textarea ? (
				<textarea ref={ref} className='input' {...props} rows={4} />
			) : (
				<input ref={ref} className='input' {...props} />
			)}
			{error && <InputError error={error} />}
		</label>
	);
}

function InputError({ error }) {
	return (
		<div className='input-error' title={error}>
			<Icons.ErrorIcon />
			{error}
		</div>
	);
}

export default forwardRef(Input);
