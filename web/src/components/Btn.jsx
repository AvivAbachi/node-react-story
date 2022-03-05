import {memo} from 'react';

const Btn = ({active, icon, ghost, className, ...props}) => {
	return (
		<button
			{...props}
			className={`btn${active ? ' btn-primary' : ''}${ghost ? ' btn-ghost' : ''}${icon ? ' btn-icon' : ''}${className ? ` ${className}` : ''}`}
		/>
	);
};

export default memo(Btn);
