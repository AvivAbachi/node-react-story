import { forwardRef, memo } from 'react';
import { Icons } from '.';

const _Input = memo(
	forwardRef(function Input({ title, name, type, error, textarea, required, ...props }, ref) {
		return (
			<label className='input-label'>
				{required && <span className='text-rose-500'>*</span>} {title || name}
				{textarea ? (
					<textarea ref={ref} className='input' name={name} required={required} {...props} rows={4} />
				) : (
					<input ref={ref} className='input' name={name} required={required} {...props} />
				)}
				{error && <_InputError error={error} />}
			</label>
		);
	})
);

const _InputError = memo(function InputError({ error }) {
	return (
		<div className='input-error' title={error}>
			<Icons.ErrorIcon />
			{error}
		</div>
	);
});

_Input.InputError = _InputError;

export default _Input;
