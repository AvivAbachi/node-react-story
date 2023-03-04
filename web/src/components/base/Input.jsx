import { forwardRef, useMemo } from 'react';

import { Icons, Label } from './Index';

function Input({ error, textarea, required, ...props }, ref) {
	const [Tag, rows] = useMemo(
		() => (textarea ? ['textarea', 4] : ['input', undefined]),
		[textarea]
	);
	return (
		<>
			<Label required={required} htmlFor={props.name}>
				{props.title || props.name}
			</Label>
			<Tag ref={ref} {...props} required={required} rows={rows} />
			{error && <InputError error={error} />}
		</>
	);
}

function InputError({ error }) {
	return (
		<div
			className='mx-2 mt-2 truncate rounded-[1.25rem] bg-primary px-2 py-1 text-sm font-semibold capitalize leading-7 text-white shadow-md'
			title={error}
		>
			<Icons.ErrorIcon />
			{error}
		</div>
	);
}

export default forwardRef(Input);
