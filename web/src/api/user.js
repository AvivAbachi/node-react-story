import storyApi from '.';

export async function signup(data) {
	return await storyApi.post('user/signup', data).then((res) => res.data);
}

export async function login(data) {
	return await storyApi.post('user/login', data).then((res) => res.data);
}

export async function logout() {
	return await storyApi.post('user/logout');
}

export async function getAccess() {
	return await storyApi.post('user/access').then((res) => res.data);
}

export async function update(data) {
	return await storyApi.post('user/update', data).then((res) => res.data);
}

export async function reset(data) {
	return await storyApi.post('user/reset', data).then((res) => res.data);
}
