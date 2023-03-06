import classNames from 'classnames';

function Label({ children, className, htmlFor, required }) {
	return (
		<label
			htmlFor={htmlFor}
			className={classNames('mt-4 block font-medium', { [` ${className}`]: className })}
		>
			{required && <span className='text-primary'>* </span>}
			{children}
		</label>
	);
}

export default Label;
