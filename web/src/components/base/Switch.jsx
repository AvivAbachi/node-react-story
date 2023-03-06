import classNames from 'classnames';

function Switch({ checked, className, name, onChange }) {
	return (
		<>
			<input
				type='checkbox'
				className='hidden'
				name={name}
				checked={checked}
				onChange={onChange}
			/>
			<div
				className={classNames(
					'relative my-4 block h-[1.6rem] w-12 cursor-pointer select-none rounded-full bg-gray-400 transition-[background-color] before:absolute before:left-[0.2rem] before:top-[0.2rem] before:block before:h-[1.2rem] before:w-[1.2rem] before:rounded-full before:bg-white before:transition-[left] before:content-[""]',
					{ '!bg-primary before:left-[1.6rem]': checked, [` ${className}`]: className }
				)}
				onClick={onChange}
			/>
		</>
	);
}

export default Switch;
