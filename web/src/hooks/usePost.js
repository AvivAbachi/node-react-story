import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UIContext, UserContext } from '../App';

const SERVER_URL = 'http://192.168.1.184:5000/';

export const usePost = () => {
	const { user } = useContext(UserContext);
	const { isUserPost, closeModal } = useContext(UIContext);
	const [post, setPost] = useState([]);
	// const [page, setPage] = useState(0);

	axios.defaults.timeout = 3000;

	const getPost = async () => {
		return await axios.get(`${SERVER_URL}`).then((res) => {
			setPost(res.data);
		});
	};

	const getUserPost = async () => {
		return await axios.get(`${SERVER_URL}user/${user.userId}`).then((res) => {
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
		return await axios.post(`${SERVER_URL}`, data).then(() => {
			closeModal();
			getPost();
		});
	};

	const updatePost = async (data) => {
		return await axios.put(`${SERVER_URL}`, data).then(() => {
			closeModal();
		});
	};

	const deletePost = async (data) => {
		return await axios.delete(`${SERVER_URL}`, data).then(() => {});
	};

	return {
		post,
		getPost,
		getUserPost,
		createPost,
		updatePost,
		deletePost,
	};
};
