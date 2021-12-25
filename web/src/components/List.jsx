import { useContext } from 'react';
import { PostContext } from '../hooks';
import { Post, ListError } from '.';

const List = () => {
	const { post: posts, userPost, serverError } = useContext(PostContext);

	return (
		<ul className='list'>{serverError ? <ListError /> : posts?.map((post) => <Post {...post} key={post.id} userPost={userPost} />)}</ul>
	);
};

export default List;
