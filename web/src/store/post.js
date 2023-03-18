import useStore from '.';
import { post as api } from '../api';
import { formatPost } from '../utils';

export async function getPost() {
	const { limit, page, userPost, user } = useStore.getState();
	try {
		const res = userPost
			? await api.getUserPost(user.userId, limit, page)
			: await api.getPost(limit, page);
		useStore.setState({
			post: res.post.map(formatPost),
			total: res.total,
			serverError: false,
		});
	} catch (err) {
		console.error(err);
		useStore.setState({ serverError: true, page: 0, total: 0, post: [] });
	}
}

export async function createPost(data) {
	const post = await api.createPost(data);
	useStore.setState((store) => ({ post: [formatPost(post), ...store.post] }));
}

export async function updatePost({ postId, ...data }) {
	const post = await api.updatePost(postId, data);
	useStore.setState((store) => {
		const posts = [...store.post];
		const index = posts.findIndex((p) => p.postId === post.postId);
		posts[index] = formatPost(post);
		return { post: posts };
	});
}

export async function deletePost({ postId }) {
	await api.deletePost(postId);
	getPost();
}

export function toggleUserPost(force) {
	useStore.setState((state) => ({
		userPost: typeof force === 'boolean' ? force : !state.userPost,
		page: 0,
	}));
	getPost();
}

export function setPage({ next, back, page }) {
	useStore.setState((state) => {
		if (next)
			return {
				page: state.page < state.pages() ? state.page + 1 : state.pages(),
			};
		if (back) return { page: state.page > 0 ? state.page - 1 : 0 };
		if (page !== undefined) return { page };
	});
	getPost();
}
