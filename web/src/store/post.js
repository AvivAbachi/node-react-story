import axios from 'axios';
import useStore from '.';
import dateFormat from '../utils/dateFormat';
const serverURL = import.meta.env.VITE_SERVER_URL;

export const getPost = async () => {
	const {interval, limit, page, userPost, user} = useStore.getState();
	axios
		.get(serverURL + (userPost ? `user/${user.userId}` : ''), {params: {page, limit}})
		.then((res) => ({
			post: res.data?.post?.map(({createdAt, updatedAt, ...post}) => ({...post, date: dateFormat(createdAt, updatedAt)})),
			total: res.data?.total,
		}))
		.then(({post, total}) => {
			useStore.setState((state) => {
				if (JSON.stringify(post) === JSON.stringify(state.post)) return {total, serverError: false};
				return {post, total, serverError: false};
			});
		})
		.catch((err) => {
			console.error(err);
			useStore.setState({serverError: true, page: 0, total: 0, post: []});
			interval.stop();
		});
};

export const toggleUserPost = (force) => {
	const {start, stop} = useStore.getState().interval;
	stop();
	useStore.setState((state) => ({
		userPost: typeof force === 'boolean' ? force : !state.userPost,
		page: 0,
	}));
	start();
};

export const createPost = async (data) => {
	const {start, stop} = useStore.getState().interval;
	stop();
	await axios.post(`${serverURL}`, data);
	start();
};

export const updatePost = async (data) => {
	const {start, stop} = useStore.getState().interval;
	stop();
	await axios.put(`${serverURL}`, data);
	start();
};

export const deletePost = async (data) => {
	const {start, stop} = useStore.getState().interval;
	stop();
	await axios.delete(`${serverURL}`, {data});
	start();
};

export const setPage = ({next, back, page}) => {
	const {start, stop} = useStore.getState().interval;
	stop();
	useStore.setState((state) => {
		if (next) return {page: state.page < state.pages() ? state.page + 1 : state.pages()};
		if (back) return {page: state.page > 0 ? state.page - 1 : 0};
		if (page !== undefined) return {page};
	});
	start();
};
