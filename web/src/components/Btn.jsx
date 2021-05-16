import { memo } from 'react';

const Btn = ({ active, icon, className, ...props }) => {
	return <button {...props} className={`btn${className ? ` ${className}` : ''}${active ? ' btn-active' : ''}${icon ? ' btn-icon' : ''}`} />;
};

export default memo(Btn);
