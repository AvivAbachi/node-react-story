import { memo, useCallback } from 'react';
import { Post, ListError, Pagination } from '.';
import useStore, { handelModal } from '../store';

const List = () => {
	const post = useStore((state) => state.post);
	const user = useStore((state) => state.user?.userId);
	const serverError = useStore((state) => state.serverError);

	const listPost = useCallback(() => {
		return post?.map(({ userId, id, ...post }) => {
			if (user == userId) {
				return (
					<Post
						key={id}
						{...post}
						onUpdate={() => handelModal('UPDATE_POST', { id, title: post.title, body: post.body })}
						onDelete={() => handelModal('DELETE_POST', { id })}
					/>
				);
			}
			return <Post key={id} {...post} />;
		});
	}, [post, user]);

	return (
		<ul className='list'>
			{serverError ? <ListError /> : listPost()}
			<Pagination />
		</ul>
	);
};

export default memo(List);
