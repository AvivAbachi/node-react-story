import classnames from 'classnames';
import { forwardRef, useMemo } from 'react';

import { ReactComponent as ErrorIcon } from '../../assets/error.svg';
import { Label } from './Index';

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
			<Tag
				className={classnames(
					'mt-2 block w-full rounded-2xl bg-primary-lightest px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-primary-dark',
					{ 'textarea-scroll resize-none rounded-xl': textarea }
				)}
				ref={ref}
				{...props}
				required={required}
				rows={rows}
			/>
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
			<ErrorIcon />
			{error}
		</div>
	);
}

export default forwardRef(Input);
