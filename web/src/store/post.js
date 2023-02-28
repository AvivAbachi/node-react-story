import useStore from '.';
import { post as api } from '../api';

const dateHelper = new Date();
const dateSettings = {
	dateStyle: 'short',
	timeStyle: 'medium',
	hour12: false,
};

export const getPost = async () => {
	const { limit, page, userPost, user } = useStore.getState();
	try {
		const res = userPost
			? await api.getUserPost(user.userId, limit, page)
			: await api.getPost(limit, page);
		useStore.setState({
			post: res.post.map(formatpost),
			total: res.total,
			serverError: false,
		});
	} catch (err) {
		console.error(err);
		useStore.setState({ serverError: true, page: 0, total: 0, post: [] });
	}
};

export const createPost = async (data) => {
	const post = await api.createPost(data);
	useStore.setState((store) => ({ post: [formatpost(post), ...store.post] }));
};

export const updatePost = async (data) => {
	const post = await api.updatePost(data);
	console.log(post);
	// useStore.setState((store) => {
	// 	return { post: [formatpost(post), ...store.post] };
	// });
};

export const deletePost = async (data) => {
	console.log(data);
	const post = await api.deletePost(data);
	console.log(post);
	//useStore.setState((store) => ({ post: store.post.filter((p) => p.postId !== data.postId) }));
};

export const toggleUserPost = (force) => {
	useStore.setState((state) => ({
		userPost: typeof force === 'boolean' ? force : !state.userPost,
		page: 0,
	}));
	getPost();
};

export const setPage = ({ next, back, page }) => {
	useStore.setState((state) => {
		if (next)
			return {
				page: state.page < state.pages() ? state.page + 1 : state.pages(),
			};
		if (back) return { page: state.page > 0 ? state.page - 1 : 0 };
		if (page !== undefined) return { page };
	});
	getPost();
};

function formatpost({ date, isEdit, ...post }) {
	dateHelper.setTime(date);
	return {
		...post,
		date:
			(isEdit ? 'Create at: ' : 'Update at: ') +
			dateHelper.toLocaleString(undefined, dateSettings),
	};
}
