import { memo } from 'react';

const Btn = ({ active, icon, ghost, className, ...props }) => {
	return (
		<button
			{...props}
			className={`btn${className ? ` ${className}` : ''}${active ? ' btn-primary' : ''}${ghost ? ' btn-ghost' : ''}${icon ? ' btn-icon' : ''}`}
		/>
	);
};

export default memo(Btn);
