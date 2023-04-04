import classNames from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from './Index';

function Dropdown({ children, ButtonChildren, className }) {
	const [open, setOpen] = useState(false);
	const menuRef = useRef();
	const buttonRef = useRef();

	const checkClick = useCallback((e) => {
		const isMenu = e.target.isSameNode(menuRef.current) || e.target.isSameNode(buttonRef.current);
		if (!isMenu) {
			setOpen(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('click', checkClick);
		return () => {
			document.removeEventListener('click', checkClick);
		};
	}, [checkClick]);

	return (
		<div className={classNames('relative', { [` ${className}`]: className })}>
			<Button
				ref={buttonRef}
				active
				className={classNames('!p-2 flex', {
					'border-primary bg-primary text-white shadow-lg shadow-primary/25': open,
				})}
				onClick={() => setOpen(!open)}
			>
				{ButtonChildren}
			</Button>
			{open && (
				<div ref={menuRef} className='absolute right-0 z-10 mt-2 w-32 select-none rounded-2xl border border-gray-500/10 bg-white p-2 shadow-xl dark:bg-gray-800'>
					{children}
				</div>
			)}
		</div>
	);
}

Dropdown.Item = function DropdownItem({ border, children, onClick }) {
	return (
		<button
			className={classNames('mb-2 block w-full select-none rounded-full bg-transparent px-2 py-1 text-center text-sm font-semibold last:mb-0 hover:bg-primary/25 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary-light', {
				'relative mt-4 before:pointer-events-none before:absolute before:top-[-9px] before:right-0 before:h-px before:w-full before:rounded-full before:bg-gray-500/20 before:content-[""] before:dark:bg-primary/20': border,
			})}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Dropdown;
