import { memo } from 'react';
import { Btn } from '.';
import useStore, { getAccess } from '../store';

const ListError = () => {
	const handelTryAgain = () => {
		getAccess();
		useStore.getState().interval.stop();
		useStore.getState().interval.start();
	};

	return (
		<div className='list-error'>
			<h2 className='list-error-title'>No Connection...</h2>
			<p className='list-error-text'>Please check your connection or try again.</p>
			<Btn active onClick={handelTryAgain}>
				Try again
			</Btn>
		</div>
	);
};

export default memo(ListError);
