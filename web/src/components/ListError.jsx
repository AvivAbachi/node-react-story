import {memo} from 'react';
import {Btn} from '.';
import useStore, {getAccess} from '../store';

const tryAgain = () => {
	getAccess();
	const {start, stop} = useStore.getState().interval;
	stop();
	start();
};

const ListError = () => (
	<div className='list-error'>
		<h2 className='list-error-title'>No Connection...</h2>
		<p className='list-error-text'>Please check your connection or try again.</p>
		<Btn active onClick={tryAgain}>
			Try again
		</Btn>
	</div>
);

export default memo(ListError);
