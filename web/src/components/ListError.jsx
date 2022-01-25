import { memo, useRef } from 'react';
import { Btn } from '.';
import useStore from '../store';

const ListError = () => {
	const start = useRef(useStore.getState().start);
	const stop = useRef(useStore.getState().stop);
	const getAccess = useRef(useStore.getState().getAccess);

	const handelTryAgain = () => {
		getAccess.current();
		start.current();
		stop.current();
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
