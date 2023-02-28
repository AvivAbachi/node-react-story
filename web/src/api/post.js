import storyApi from './index';

export async function getUserPost(userId, limit, page) {
	return storyApi
		.get(`post/user/${userId}`, { params: { limit, page } })
		.then((res) => res.data);
}
export async function getPost(limit, page) {
	return storyApi.get('post/', { params: { limit, page } }).then((res) => res.data);
}

export async function createPost(data) {
	return await storyApi.post('post/', data).then((res) => res.data);
}
export async function updatePost(data) {
	return await storyApi.put('post/', data).then((res) => res.data);
}
export async function deletePost(data) {
	return await storyApi.delete('post/', data).then((res) => res.data);
}
