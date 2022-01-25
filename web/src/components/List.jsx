import { memo } from 'react';
import { Post, ListError } from '.';
import useStore, { selector } from '../store';

const List = () => {
	const post = useStore(selector.post);
	const userPost = useStore(selector.userPost);
	const serverError = useStore(selector.serverError);

	return <ul className='list'>{serverError ? <ListError /> : post?.map((post) => <Post {...post} key={post.id} userPost={userPost} />)}</ul>;
};

export default memo(List);
