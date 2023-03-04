function Radio({ name, value, className, checked, onChange, ...props }) {
	return (
		<input
			type='radio'
			className={
				className +
				' relative m-2 inline-block h-8 w-8 cursor-pointer appearance-none rounded-full ring-0 ring-gray-700 after:absolute after:block after:h-full after:w-full after:rounded-full after:bg-gradient-to-tr after:from-gray-100/50 after:to-white/0 after:content-[""] checked:ring-2 checked:ring-offset-2  focus:outline-none dark:ring-gray-100 dark:ring-offset-gray-700'
			}
			name={name}
			value={value}
			checked={checked}
			onChange={(e) => onChange?.(e.target.value)}
			{...props}
		/>
	);
}
export default Radio;
