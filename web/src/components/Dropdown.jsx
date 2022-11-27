import { useEffect, useRef, useState } from 'react';

function Dropdown({ children, Btn }) {
	const [open, setOpen] = useState(false);
	const menuRef = useRef();
	const buttonRef = useRef();

	const checkClick = (e) => {
		const isMenu =
			e.target.isSameNode(menuRef.current) ||
			e.target.isSameNode(buttonRef.current);
		if (!isMenu) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', checkClick);
		return () => {
			document.removeEventListener('click', checkClick);
		};
	}, []);

	return (
		<div className={`dropdown${open ? ' dropdown-open' : ''}`}>
			<button
				ref={buttonRef}
				className='dropdown-btn'
				onClick={() => setOpen(!open)}
			>
				{Btn}
			</button>
			{open && (
				<div ref={menuRef} className='dropdown-menu'>
					{children}
				</div>
			)}
		</div>
	);
}

Dropdown.Item = function DropdownItem({ border, children, onClick }) {
	return (
		<button
			className={`dropdown-item${border ? ' dropdown-item-border' : ''}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Dropdown;
