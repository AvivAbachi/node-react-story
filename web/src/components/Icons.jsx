import { memo } from 'react';

const FaceIcon = () => {
	return (
		<svg
			className='face-icon'
			viewBox='0 0 496 512'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z' />
		</svg>
	);
};

const MenuIcon = () => {
	return (
		<svg
			className='menu-icon'
			viewBox='0 0 32 32'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='m2 16h28' />
			<path d='m2 24h28' />
			<path d='m2 8h28' />
		</svg>
	);
};

const PlusIcon = () => {
	return (
		<svg
			className='pluses-icon'
			viewBox='0 0 448 512'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
		</svg>
	);
};

const CloseIcon = () => {
	return (
		<svg
			className='close-icon'
			viewBox='0 0 352 512'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' />
		</svg>
	);
};

const ErrorIcon = () => {
	return (
		<svg
			className='error-icon'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M12,20c-4.411,0-8-3.589-8-8 s3.567-8,7.953-8C16.391,4,20,7.589,20,12S16.411,20,12,20z' />
			<path d='M11 7H13V14H11zM11 15H13V17H11z' />
		</svg>
	);
};

const TrashIcon = () => {
	return (
		<svg
			className='trash-icon'
			viewBox='0 0 448 512'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z' />
		</svg>
	);
};

const EditIcon = () => {
	return (
		<svg
			className='edit-icon'
			viewBox='0 0 576 512'
			height='1em'
			width='1em'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z' />
		</svg>
	);
};

const Icons = {
	FaceIcon: memo(FaceIcon),
	MenuIcon: memo(MenuIcon),
	PlusIcon: memo(PlusIcon),
	CloseIcon: memo(CloseIcon),
	ErrorIcon: memo(ErrorIcon),
	TrashIcon: memo(TrashIcon),
	EditIcon: memo(EditIcon),
};

export default Icons;
