import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useEffect } from 'react';

import { Button, Portal } from './Index';

function Modal({ children, className, open, backdrop = true, onClose }) {
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
				<div className={classNames('fixed top-0 left-0 z-10 flex h-screen w-screen items-center justify-center duration-300 ease-linear', { [` ${className}`]: className })}>
					{children}
					{backdrop && <Backdrop onClose={onClose} />}
				</div>
			</Portal>
		);
}

Modal.Content = function Content({ children, className }) {
	return <div className={classNames('relative z-20 w-11/12 max-w-lg rounded-lg bg-white shadow-lg dark:bg-gray-700', { [` ${className}`]: className })}>{children}</div>;
};

Modal.Header = function Header({ title, className, classNameTitle, onClose }) {
	return (
		<div className={classNames('flex justify-between border-b-2 border-gray-100 px-5 py-4 text-gray-700 dark:text-white', { [` ${className}`]: className })}>
			<div
				className={classNames('pt-1 text-2xl font-bold', {
					[` ${classNameTitle}`]: classNameTitle,
				})}
			>
				{title}
			</div>
			{onClose && (
				<Button type='button' icon onClick={onClose}>
					<FontAwesomeIcon icon={faXmark} className='h-7 w-7 block p-0' />
				</Button>
			)}
		</div>
	);
};

Modal.Body = function Body({ children, className }) {
	return <div className={classNames('px-10 pb-4', { [` ${className}`]: className })}>{children}</div>;
};

Modal.Footer = function Footer({ children, className, onClose }) {
	return (
		<div
			className={classNames('flex justify-end py-4 px-5', {
				[` ${className}`]: className,
			})}
		>
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
	return <div className='absolute top-0 left-0 z-10 h-screen w-screen bg-black/30' onClick={onClose} />;
}

export default Modal;
