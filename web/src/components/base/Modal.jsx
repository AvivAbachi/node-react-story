import { useEffect } from 'react';

import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { Button, Portal } from './Index';

function Modal({ children, open, onClose }) {
	// const handelClose = useCallback(() => {
	// setTimeout(() => onClose?.(), 110);
	// }, [onClose]);

	useEffect(() => {
		if (open) {
			document.querySelector('body').style.overflow = 'hidden';
		} else {
			//handelClose();
			document.querySelector('body').style.overflow = null;
		}
	}, [open]);

	if (open)
		return (
			<Portal id='modal'>
				<div className='fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center duration-300 ease-linear'>
					{children}
					<Backdrop onClose={onClose} />
				</div>
			</Portal>
		);
}

Modal.Content = function Content({ children }) {
	return (
		<div className='relative z-20 w-11/12 max-w-lg rounded-lg bg-white shadow-lg dark:bg-gray-700'>
			{children}
		</div>
	);
};

Modal.Header = function Header({ title, onClose }) {
	return (
		<div className='flex justify-between border-b-2 border-gray-100 px-5 py-4 text-gray-700 dark:text-white'>
			<div className='pt-1 text-2xl font-bold'>{title}</div>
			{onClose && (
				<Button type='button' icon onClick={onClose}>
					<CloseIcon />
				</Button>
			)}
		</div>
	);
};

Modal.Body = function Body({ children }) {
	return <div className='px-10 pb-4'>{children}</div>;
};

Modal.Footer = function Footer({ children, onClose }) {
	return (
		<div className='flex justify-end py-4 px-5'>
			{onClose && (
				<Button className='mr-4' type='button' onClick={onClose}>
					Close
				</Button>
			)}
			{children}
		</div>
	);
};

function Backdrop({ onClose }) {
	return (
		<div
			className='absolute top-0 left-0 z-10 h-screen w-screen bg-black/30'
			onClick={onClose}
		/>
	);
}

export default Modal;
