import { createContext, memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { UserContext } from '.';
import { useInterval } from 'react-interval-hook';
import dataFormat from '../utils/dataFormat';

axios.defaults.timeout = 3000;
const serverURL = import.meta.env.VITE_SERVER_URL;

const usePost = () => {
	const { user } = useContext(UserContext);
	const [post, setPost] = useState([]);
	const [userPost, setIsUserPost] = useState(false);
	const [serverError, setServerError] = useState(true);
	const { start, stop } = useInterval(() => getPost(), 25000000, { autoStart: true, immediate: true });

	useEffect(() => {
		return () => {
			stop();
		};
	}, []);

	const reloadPost = () => {
		stop();
		start();
	};

	// const [page, setPage] = useState(0);
	//?page=${page}
	// setPage((page) => page + 1);[...post, ...newPost]
	const getPost = async () => {
		axios
			.get(`${serverURL}${userPost ? `user/${user.userId}` : ``}`)
			.then((res) =>
				res.data?.map((p) => {
					return { id: p.id, title: p.title, body: p.body, name: p.name, data: dataFormat(p.createdAt, p.updatedAt) };
				})
			)
			.then((data) => {
				setServerError(false);
				setPost((post) => (post === data ? post : data));
			})
			.catch((err) => {
				console.error(err);
				setServerError(true);
				stop();
			});
	};

	const toggleUserPost = () => {
		setIsUserPost((userPost) => !userPost);
		reloadPost();
	};

	const createPost = async (data) => {
		await axios.post(`${serverURL}`, data);
		reloadPost();
	};

	const updatePost = async (data) => {
		await axios.put(`${serverURL}`, data);
		reloadPost();
	};

	const deletePost = async (data) => {
		await axios.delete(`${serverURL}`, { data });
		reloadPost();
	};

	const _createPost = useRef(createPost);
	const _updatePost = useRef(updatePost);
	const _deletePost = useRef(deletePost);
	const _toggleUserPost = useRef(toggleUserPost);
	const _reloadPost = useRef(reloadPost);

	return {
		post,
		userPost,
		serverError,
		createPost: _createPost.current,
		updatePost: _updatePost.current,
		deletePost: _deletePost.current,
		toggleUserPost: _toggleUserPost.current,
		reloadPost: _reloadPost.current,
	};
};

export const PostContext = createContext(usePost);

const PostProvider = ({ children }) => {
	const post = usePost();
	return <PostContext.Provider value={post} children={children} />;
};

export default memo(PostProvider);
