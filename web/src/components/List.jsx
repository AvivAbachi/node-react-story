import { memo } from 'react';
import { Post } from '.';

const List = ({ posts }) => {
	return <ul className='list'>{posts?.map((post) => <Post {...post} key={post.id} />) || 'No Data'}</ul>;
};

export default memo(List);
