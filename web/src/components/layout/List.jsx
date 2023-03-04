import { useMemo } from 'react';

import useStore, { modal, user } from '../../store';
import { Button, Post } from '../base/Index';

function List() {
	const post = useStore((state) => state.post);
	const user = useStore((state) => state.user?.userId);
	const serverError = useStore((state) => state.serverError);

	const listPost = useMemo(() => {
		return post?.map(({ userId, ...post }) => {
			if (user === userId) {
				post.onUpdate = (post) => modal.setModal('UPDATE_POST', post);
				post.onDelete = (post) => modal.setModal('DELETE_POST', post);
			}
			return post;
		});
	}, [post, user]);

	return (
		<ul className='px-6 pt-20 pb-28'>
			{serverError ? (
				<ListError />
			) : (
				listPost.map((post) => <Post key={post.postId} {...post} />)
			)}
		</ul>
	);
}

function ListError() {
	return (
		<div className='mx-auto mt-16 w-96 text-center'>
			<h2 className='text-4xl font-bold text-gray-700'>No Connection...</h2>
			<p className='mt-1 mb-5 inline-block text-gray-500'>
				Please check your connection or try again.
			</p>
			<Button className='m-auto' active onClick={user.start}>
				Try again
			</Button>
		</div>
	);
}

export default List;
