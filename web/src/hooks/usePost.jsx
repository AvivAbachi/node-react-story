import { createContext, memo, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '.';

axios.defaults.timeout = 3000;
const serverURL = import.meta.env.VITE_SERVER_URL;

const usePost = () => {
	const { user } = useContext(UserContext);
	const [post, setPost] = useState([]);
	const [userPost, setIsUserPost] = useState(false);

	// const [page, setPage] = useState(0);
	//?page=${page}
	// setPage((page) => page + 1);[...post, ...newPost]

	const getPost = async () => {
		return await axios.get(`${serverURL}`).then((res) => {
			setPost(res.data);
		});
	};

	const getUserPost = async () => {
		return await axios.get(`${serverURL}user/${user.userId}`).then((res) => {
			setPost(res.data);
		});
	};

	const toggleUserPost = () => {
		setIsUserPost((userPost) => !userPost);
	};

	useEffect(() => {
		userPost ? getUserPost() : getPost();
	}, [userPost]);

	const createPost = async (data) => {
		return await axios.post(`${serverURL}`, data).then(() => {
			getPost();
		});
	};

	const updatePost = async (data) => {
		return await axios.put(`${serverURL}`, data).then(() => {
			getPost();
		});
	};

	const deletePost = async (data) => {
		return await axios.delete(`${serverURL}`, { data }).then(() => {
			getPost();
		});
	};

	return {
		post,
		getPost,
		getUserPost,
		createPost,
		updatePost,
		deletePost,
		userPost,
		toggleUserPost,
	};
};

export const PostContext = createContext(usePost);

const PostProvider = ({ children }) => {
	const post = usePost();
	return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};

export default memo(PostProvider);
