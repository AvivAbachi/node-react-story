function Label({ children, htmlFor, required }) {
	return (
		<label htmlFor={htmlFor} className='mt-4 block font-medium'>
			{required && <span className='text-primary'>* </span>}
			{children}
		</label>
	);
}

export default Label;
