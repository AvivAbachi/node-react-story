import classnames from 'classnames';
import { forwardRef } from 'react';

function Button({ active, icon, ghost, disabled, className, ...props }, ref) {
	return (
		<button
			ref={ref}
			disabled={disabled}
			className={classnames(
				'block select-none rounded-full bg-transparent py-2 px-4 font-semibold hover:bg-gray-500 hover:bg-opacity-30 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:cursor-wait disabled:bg-gray-200 disabled:shadow-none disabled:hover:bg-gray-200',
				{
					'!bg-primary font-bold tracking-wide text-white shadow-lg shadow-primary/25 hover:bg-primary-light hover:shadow-none focus:ring-primary-light active:ring-primary':
						active,
					'hover:bg-primary-dark/75 focus:ring-2 focus:ring-primary-dark active:bg-primary-darkest':
						ghost,
					'!p-2': icon,
					[` ${className}`]: className,
				}
			)}
			{...props}
		/>
	);
}

export default forwardRef(Button);
