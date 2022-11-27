import { useCallback } from 'react';
import { Post, ListError } from './index';
import useStore, { setModal } from '../store';

function List() {
	const post = useStore((state) => state.post);
	const user = useStore((state) => state.user?.userId);
	const serverError = useStore((state) => state.serverError);

	const listPost = useCallback(() => {
		return post?.map(({ userId, id, ...post }) => {
			if (user === userId) {
				return (
					<Post
						key={id}
						{...post}
						onUpdate={() =>
							setModal('UPDATE_POST', { id, title: post.title, body: post.body })
						}
						onDelete={() => setModal('DELETE_POST', { id })}
					/>
				);
			}
			return <Post key={id} {...post} />;
		});
	}, [post, user]);

	return <ul className='list'>{serverError ? <ListError /> : listPost()}</ul>;
}

export default List;
