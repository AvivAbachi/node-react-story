import { memo } from 'react';
import { Post } from '.';

const List = ({ posts, userPost }) => {
	return <ul className='list'>{posts?.map((post) => <Post {...post} key={post.id} userPost={userPost} />) || 'No Data'}</ul>;
};

export default memo(List);
