import useStore from '.';
import { user as api } from '../api';

export const signup = async (data) => {
	await api.signup(data).then(({ accessToken, user }) => {
		useStore.setState({ token: accessToken, user });
	});
};

export const login = async (data) => {
	await api.login(data).then(({ accessToken, user }) => {
		useStore.setState({ token: accessToken, user });
	});
};

export const logout = async () => {
	await api.logout();
	useStore.setState({
		user: {
			username: undefined,
			email: undefined,
			userId: undefined,
			name: undefined,
		},
		token: undefined,
	});
};

export const getAccess = async () => {
	const token = useStore.getState().token;
	if (token) {
		await api
			.getAccess()
			.then(({ accessToken, user }) => {
				useStore.setState({ token: accessToken, user });
			})
			.catch((err) => {
				const status = err?.response?.status;
				if (status === 401 || status === 403 || status === 404) {
					logout();
				}
			});
	}
};

export const update = async (data) => {
	await api.update(data).then(({ accessToken, user }) => {
		useStore.setState({ token: accessToken, user });
	});
};

export const reset = async (data) => {
	return await api
		.reset(data)
		.then(({ password }) => ({ username: data.username, password }));
};
