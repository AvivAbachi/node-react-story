import { memo, useEffect, useRef, useState } from 'react';
import { FaceIcon, MenuIcon } from './Icons';

const Dropdown = memo(function Dropdown({ children, title }) {
	const [open, setOpen] = useState(false);

	const menuRef = useRef();
	const buttonRef = useRef();

	const cheakClick = (e) => {
		const isMenu = e.target.isSameNode(menuRef.current) || e.target.isSameNode(buttonRef.current);
		if (!isMenu) {
			setOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', cheakClick);
		return () => {
			document.removeEventListener('click', cheakClick);
		};
	}, []);

	return (
		<div className={`dropdown${open ? ' dropdown-open' : ''}`}>
			<button ref={buttonRef} className='dropdown-btn' onClick={() => setOpen(!open)}>
				{title ? (
					<div className='dropdown-title'>{title}</div>
				) : (
					<>
						<FaceIcon />
						<MenuIcon />
					</>
				)}
			</button>
			{open && (
				<div ref={menuRef} className='dropdown-menu'>
					{children}
				</div>
			)}
		</div>
	);
});

Dropdown.Item = memo(function DropdownItem({ border, children, onClick }) {
	return (
		<button className={'dropdown-item' + (border ? ' dropdown-item-border' : '')} onClick={onClick}>
			{children}
		</button>
	);
});

export default Dropdown;
