import { useContext } from 'react';
import { Btn } from '.';
import { PostContext, UserContext } from '../hooks';

const ListError = () => {
	const { getPost } = useContext(PostContext);
	const { getAccess } = useContext(UserContext);
	const handelTryAgain = () => {
		getAccess();
		getPost();
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

export default ListError;
