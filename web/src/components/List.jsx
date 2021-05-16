import { memo, useContext, useMemo } from 'react';
import { Post } from '.';
import { PostContext } from '../App';

const List = () => {
	const { post } = useContext(PostContext);
	const getPost = useMemo(() => post.map((post) => <Post {...post} key={post.id} />), [post]);
	return <ul className='list'>{getPost || 'No Data'}</ul>;
};

export default memo(List);
