import { memo } from 'react';
import { Btn } from '.';
import useStore from '../store';

const ListError = () => {
	const reloadPost = useStore.getState().reloadPost;
	const getAccess = useStore.getState().getAccess;

	const handelTryAgain = () => {
		getAccess();
		reloadPost();
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
