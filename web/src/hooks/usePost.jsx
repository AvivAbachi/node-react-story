import { createContext, memo, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ModalContext, UserContext } from '.';

const usePost = () => {
	const { user } = useContext(UserContext);
	const { closeModal } = useContext(ModalContext);
	const [post, setPost] = useState([]);
	const [isUserPost, setIsUserPost] = useState(false);
	const serverURL = import.meta.env.VITE_SERVER_URL;

	// const [page, setPage] = useState(0);

	axios.defaults.timeout = 3000;

	const toggleUserPost = () => {
		setIsUserPost((userPost) => !userPost);
	};

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

	useEffect(() => {
		if (isUserPost) {
			getUserPost();
		} else {
			getPost();
		}
	}, [isUserPost]);

	//?page=${page}
	// setPage((page) => page + 1);[...post, ...newPost]

	const createPost = async (data) => {
		return await axios.post(`${serverURL}`, data).then(() => {
			closeModal();
			getPost();
		});
	};

	const updatePost = async (data) => {
		return await axios.put(`${serverURL}`, data).then(() => {
			closeModal();
		});
	};

	const deletePost = async (data) => {
		return await axios.delete(`${serverURL}`, data).then(() => {});
	};

	return {
		post,
		getPost,
		getUserPost,
		createPost,
		updatePost,
		deletePost,
		isUserPost,
		toggleUserPost,
	};
};

export const PostContext = createContext(usePost);

const PostProvider = ({ children }) => {
	const post = usePost();
	return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
};

export default memo(PostProvider);
