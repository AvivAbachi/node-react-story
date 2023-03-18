import storyApi from '.';
import { formatPost } from '../utils';

export async function getUserPost(userId, limit, page) {
	return storyApi.get(`post/user/${userId}`, { params: { limit, page } }).then((res) => {
		res.data.post = res.data.post?.map(formatPost);
		return res.data;
	});
}

export async function getPost(limit, page) {
	return storyApi.get('post/', { params: { limit, page } }).then((res) => {
		res.data.post = res.data.post?.map(formatPost);
		return res.data;
	});
}

export async function createPost(post) {
	return await storyApi.post('post/', post).then((res) => res.data);
}

export async function updatePost(postId, post) {
	return await storyApi.put(`post/${postId}`, post).then((res) => res.data);
}

export async function deletePost(postId) {
	return await storyApi.delete(`post/${postId}`).then((res) => res.data);
}
