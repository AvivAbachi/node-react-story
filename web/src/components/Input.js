import { forwardRef, memo } from 'react';
import { ErrorIcon } from './Icons';

const Input = ({ value, required, onChange, type, placeholder, label, name, error }, ref) => {
	return (
		<>
			<label className='input-label'>{label} </label>
			<input
				className='input'
				type={type}
				placeholder={placeholder}
				name={name}
				value={value}
				required={required}
				onChange={onChange}
				ref={ref}
			/>
			{error && <InputError error={error} />}
		</>
	);
};

export const InputError = memo(function InputError({ error }) {
	return (
		<div className='input-error' title={error}>
			<ErrorIcon />
			{error}
		</div>
	);
});

export default memo(forwardRef(Input));
