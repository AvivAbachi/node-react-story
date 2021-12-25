import { memo, useContext } from 'react';
import { PostContext, UserContext } from '../hooks';
import { Post, Btn } from '.';

const List = () => {
	const { post: posts, userPost, serverError, getPost } = useContext(PostContext);
	const { getAccess } = useContext(UserContext);

	const handelTryAgain = () => {
		getAccess();
		getPost();
	};
	return (
		<ul className='list'>
			{serverError ? (
				<div className='list-error'>
					<h2 className='list-error-title'>No Connection...</h2>
					<p className='list-error-text'>Please check your connection or try again.</p>
					<Btn active onClick={handelTryAgain}>
						Try again
					</Btn>
				</div>
			) : (
				posts.map((post) => <Post {...post} key={post.id} userPost={userPost} />)
			)}
		</ul>
	);
};

export default memo(List);
