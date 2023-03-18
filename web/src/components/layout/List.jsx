import { useMemo } from 'react';

import { Button, Post } from '../base/Index';

function List({ post, userPost, isLoading, isError, onUpdate, onDelete, onTryAgain }) {
	const listPost = useMemo(() => {
		return post?.map((post) => {
			post.userId = undefined;
			if (userPost) {
				post.onUpdate = (post) => onUpdate(post);
				post.onDelete = (post) => onDelete(post);
			}
			return post;
		});
	}, [onDelete, onUpdate, post, userPost]);

	return (
		<ul className='px-6 pt-20 pb-28'>
			{isError ? (
				<ListError onClick={onTryAgain} />
			) : isLoading ? (
				<div>loading</div>
			) : (
				listPost?.map((post) => <Post key={post.postId} {...post} />)
			)}
		</ul>
	);
}

function ListError({ onClick }) {
	return (
		<div className='mx-auto mt-16 w-96 text-center'>
			<h2 className='text-4xl font-bold text-gray-700'>No Connection...</h2>
			<p className='mt-1 mb-5 inline-block text-gray-500'>
				Please check your connection or try again.
			</p>
			<Button className='m-auto' active onClick={onClick}>
				Try again
			</Button>
		</div>
	);
}

export default List;
