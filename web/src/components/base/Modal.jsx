import { useEffect } from 'react';

import { Button, Icons, Portal } from './Index';

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
				<div className='modal'>
					{children}
					<Backdrop closeModal={onClose} />
				</div>
			</Portal>
		);
}

Modal.Content = function Content({ children }) {
	return <div className='modal-content'>{children}</div>;
};

Modal.Header = function Header({ title, onClose }) {
	return (
		<div className='modal-header'>
			<div className='modal-title'>{title}</div>
			{onClose && (
				<Button type='button' icon onClick={onClose}>
					<Icons.CloseIcon />
				</Button>
			)}
		</div>
	);
};

Modal.Body = function Body({ children }) {
	return <div className='modal-body'>{children}</div>;
};

Modal.Footer = function Footer({ children, onClose }) {
	return (
		<div className='modal-footer'>
			{onClose && (
				<Button type='button' onClick={onClose}>
					Close
				</Button>
			)}
			{children}
		</div>
	);
};

function Backdrop({ closeModal }) {
	return <div className='modal-backdrop' onClick={closeModal} />;
}

export default Modal;
//export default ModalPortal(Modal, document.querySelector('#modal'));
