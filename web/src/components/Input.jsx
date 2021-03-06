import {forwardRef, memo} from 'react';
import {Icons} from '.';

const _Input = memo(
	forwardRef(function Input({error, textarea, required, ...props}, ref) {
		return (
			<label className='input-label'>
				{required && <span>{'* '}</span>}
				{props.title || props.name}
				{textarea ? <textarea ref={ref} className='input' {...props} rows={4} /> : <input ref={ref} className='input' {...props} />}
				{error && <_InputError error={error} />}
			</label>
		);
	})
);

const _InputError = memo(function InputError({error}) {
	return (
		<div className='input-error' title={error}>
			<Icons.ErrorIcon />
			{error}
		</div>
	);
});

_Input.InputError = _InputError;

export default _Input;
