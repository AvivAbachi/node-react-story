import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { forwardRef, useMemo } from 'react';

import { Label } from './Index';

function Input({ error, textarea, required, className, ...props }, ref) {
	const [Tag, rows, extraClass] = useMemo(() => {
		return textarea ? ['textarea', 4, 'textarea-scroll resize-none rounded-xl'] : ['input', undefined, undefined];
	}, [textarea]);

	return (
		<>
			<Label required={required} htmlFor={props.name}>
				{props.title || props.name}
			</Label>
			<Tag className={classNames('mt-2 block w-full rounded-2xl bg-primary-lightest px-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-primary-dark', extraClass, { [` ${className}`]: className })} ref={ref} {...props} required={required} rows={rows} />
			{error && <InputError error={error} />}
		</>
	);
}

function InputError({ error }) {
	return (
		<div className='mx-2 mt-2 truncate rounded-[1.25rem] bg-primary p-2 text-sm font-semibold capitalize text-white shadow-md' title={error}>
			<FontAwesomeIcon icon={faCircleExclamation} className='mr-1 h-5 w-5' />
			{error}
		</div>
	);
}

export default forwardRef(Input);
