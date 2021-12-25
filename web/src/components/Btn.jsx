const Btn = ({ active, icon, ghost, className, ...props }) => {
	return (
		<button
			{...props}
			className={`btn${className ? ` ${className}` : ''}${active ? ' btn-active' : ''}${ghost ? ' btn-ghost' : ''}${icon ? ' btn-icon' : ''}`}
		/>
	);
};

export default Btn;
