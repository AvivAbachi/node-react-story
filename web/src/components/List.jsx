import { useCallback } from 'react';
import { Post, ListError } from './index';
import useStore, { setModal } from '../store';

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

export default List;
