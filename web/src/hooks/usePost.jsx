import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '.';

axios.defaults.timeout = 3000;
const serverURL = import.meta.env.VITE_SERVER_URL;

const usePost = () => {
	const { user } = useContext(UserContext);
	const [post, setPost] = useState([]);
	const [userPost, setIsUserPost] = useState(false);
	const [serverError, setServerError] = useState(false);

	// const [page, setPage] = useState(0);
	//?page=${page}
	// setPage((page) => page + 1);[...post, ...newPost]

	const getPost = async () => {
		await axios
			.get(`${serverURL}${userPost ? `user/${user.userId}` : ``}`)
			.then((res) => {
				setPost(res.data);
				setServerError(false);
			})
			.catch((err) => {
				console.error(err);
				setServerError(true);
			});
	};

	const toggleUserPost = () => {
		setIsUserPost((userPost) => !userPost);
	};

	useEffect(() => {
		getPost();
	}, [userPost]);

	const createPost = async (data) => {
		await axios.post(`${serverURL}`, data).then(() => {
			getPost();
		});
	};

	const updatePost = async (data) => {
		await axios.put(`${serverURL}`, data).then(() => {
			getPost();
		});
	};

	const deletePost = async (data) => {
		await axios.delete(`${serverURL}`, { data }).then(() => {
			getPost();
		});
	};

	return {
		post,
		createPost,
		updatePost,
		deletePost,
		userPost,
		toggleUserPost,
		serverError,
		getPost,
	};
};

export const PostContext = createContext(usePost);

const PostProvider = ({ children }) => {
	const post = usePost();
	return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};

export default PostProvider;
