import { memo } from 'react';
import { Post, ListError } from '.';
import useStore from '../store';

const List = () => {
	const post = useStore((state) => state.post);
	const userPost = useStore((state) => state.userPost);
	const serverError = useStore((state) => state.serverError);

	return <ul className='list'>{serverError ? <ListError /> : post?.map((post) => <Post {...post} key={post.id} userPost={userPost} />)}</ul>;
};

export default memo(List);
