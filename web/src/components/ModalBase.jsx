import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Btn, Icons } from './index';
import useStore, { setModal } from '../store';

export default function ModalBase({
	children,
	title,
	action,
	form,
	onAction,
	disabel,
	close,
	closeState,
}) {
	useEffect(() => {
		document.querySelector('body').style.overflow = 'hidden';
		return async () => {
			document.querySelector('body').style.overflow = null;
		};
	}, []);

	useEffect(() => {
		if (closeState) closeModal();
	}, [closeState]);

	const closeModal = async () => {
		setTimeout(() => setModal(), 110);
	};

	return (
		<div className='modal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<div className='modal-title'>{title}</div>
					<Btn icon onClick={closeModal} type={form ? 'button' : undefined}>
						<Icons.CloseIcon />
					</Btn>
				</div>
				{children}
				<div className='modal-footer'>
					<Btn onClick={closeModal} type={form ? 'button' : undefined}>
						{close || 'Close'}
					</Btn>
					{onAction && (
						<Btn
							type={form ? 'submit' : undefined}
							active
							disabled={disabel}
							onClick={onAction}
						>
							{action}
						</Btn>
					)}
				</div>
			</div>
			<div className='modal-backdrop' onClick={closeModal} />
		</div>
	);
}

export function ModalPortal(Component, el) {
	return function Portal() {
		const modal = useStore((state) => state.modal);
		return modal.type ? createPortal(<Component {...modal} />, el) : null;
	};
}
