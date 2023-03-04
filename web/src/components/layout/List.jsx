import { useCallback } from 'react';

import useStore, { getAccess, getPost, setModal } from '../../store';
import { Button, Post } from '../base/Index';

function List() {
	const post = useStore((state) => state.post);
	const user = useStore((state) => state.user?.userId);
	const serverError = useStore((state) => state.serverError);

	const listPost = useCallback(() => {
		return post?.map(({ userId, postId, ...post }) => {
			if (user === userId) {
				return (
					<Post
						key={postId}
						{...post}
						onUpdate={() =>
							setModal('UPDATE_POST', { postId, title: post.title, body: post.body })
						}
						onDelete={() => setModal('DELETE_POST', { postId })}
					/>
				);
			}
			return <Post key={postId} {...post} />;
		});
	}, [post, user]);

	return <ul className='px-6 pt-20 pb-28'>{serverError ? <ListError /> : listPost()}</ul>;
}

const tryAgain = () => {
	getAccess();
	getPost();
};

function ListError() {
	return (
		<div className='mx-auto mt-16 w-96 text-center'>
			<h2 className='text-4xl font-bold text-gray-700'>No Connection...</h2>
			<p className='mt-1 mb-5 inline-block text-gray-500'>
				Please check your connection or try again.
			</p>
			<Button className='m-auto' active onClick={tryAgain}>
				Try again
			</Button>
		</div>
	);
}

export default List;
