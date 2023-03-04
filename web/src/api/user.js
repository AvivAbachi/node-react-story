import storyApi from '.';

export const signup = async (data) => {
	return await storyApi.post('user/signup', data).then((res) => res.data);
};

export const login = async (data) => {
	return await storyApi.post('user/login', data).then((res) => res.data);
};

export const logout = async () => {
	return await storyApi.post('user/logout');
};

export const getAccess = async () => {
	return await storyApi.post('user/access').then((res) => res.data);
};

export const update = async (data) => {
	return await storyApi.post('user/update', data).then((res) => res.data);
};

export const reset = async (data) => {
	return await storyApi.post('user/reset', data).then((res) => res.data);
};
