import axios from 'axios';
import useStore from '.';
import dateFormat from '../utils/dateFormat';
const serverURL = import.meta.env.VITE_SERVER_URL;

export const getPost = async () => {
	const { interval, limit, page, userPost } = useStore.getState();
	axios
		.get(`${serverURL}${userPost ? `user/${user.userId}` : ``}`, { params: { page, limit } })
		.then((res) => ({
			post: res.data?.post?.map(({ createdAt, updatedAt, ...post }) => ({ ...post, date: dateFormat(createdAt, updatedAt) })),
			total: res.data?.total,
		}))
		.then(({ post, total }) => {
			useStore.setState((state) => {
				if (JSON.stringify(post) != JSON.stringify(state.post)) {
					return { post, total, serverError: false };
				}
			});
		})
		.catch((err) => {
			console.error(err);
			useStore.setState({ serverError: true, page: 0, total: 0, post: [] });
			interval.stop();
		});
};

export const toggleUserPost = () => {
	const { start, stop } = useStore.getState().interval;
	useStore.setState((state) => ({ userPost: !state.userPost }));
	stop();
	start();
};

export const createPost = async (data) => {
	const { start, stop } = useStore.getState().interval;
	await axios.post(`${serverURL}`, data);
	stop();
	start();
};

export const updatePost = async (data) => {
	const { start, stop } = useStore.getState().interval;
	await axios.put(`${serverURL}`, data);
	stop();
	start();
};

export const deletePost = async (data) => {
	const { start, stop } = useStore.getState().interval;
	await axios.delete(`${serverURL}`, { data });
	stop();
	start();
};

export const setPage = ({ next, back, page }) => {
	const { start, stop } = useStore.getState().interval;
	stop();
	useStore.setState((state) => {
		const pages = state.pages();
		if (next) return { page: state.page < pages ? state.page + 1 : pages };
		if (back) return { page: state.page > 0 ? state.page - 1 : 0 };
		if (page !== undefined) return { page };
	});
	start();
};
