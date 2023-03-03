import { forwardRef } from 'react';

import { Icons } from './Index';

function Input({ error, textarea, required, ...props }, ref) {
	return (
		<label className='input-label'>
			{required && <span>{'* '}</span>}
			{props.title || props.name}
			{textarea ? (
				<textarea ref={ref} className='input' {...props} required={required} rows={4} />
			) : (
				<input ref={ref} className='input' {...props} required={required} />
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
