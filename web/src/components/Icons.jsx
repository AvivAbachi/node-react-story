import React, { memo } from 'react';

export const FaceIcon = memo(function FaceIcon() {
	return (
		<svg className='face-icon' viewBox='0 0 496 512' xmlns='http://www.w3.org/2000/svg'>
			<path d='M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z' />
		</svg>
	);
});

export const MenuIcon = memo(function MenuIcon() {
	return (
		<svg className='menu-icon' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
			<path d='m2 16h28' />
			<path d='m2 24h28' />
			<path d='m2 8h28' />
		</svg>
	);
});

export const PlusIcon = memo(function PlusIcon() {
	return (
		<svg className='pluses-icon' viewBox='0 0 448 512' xmlns='http://www.w3.org/2000/svg'>
			<path d='M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z' />
		</svg>
	);
});

export const CloseIcon = memo(function CloseIcon() {
	return (
		<svg className='close-icon' viewBox='0 0 352 512' xmlns='http://www.w3.org/2000/svg'>
			<path d='M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z' />
		</svg>
	);
});

export const ErrorIcon = memo(function ErrorIcon() {
	return (
		<svg className='error-icon' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
			<path d='M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M12,20c-4.411,0-8-3.589-8-8 s3.567-8,7.953-8C16.391,4,20,7.589,20,12S16.411,20,12,20z' />
			<path d='M11 7H13V14H11zM11 15H13V17H11z' />
		</svg>
	);
});
