import axios from 'axios';
import useStore from '.';
const serverURL = import.meta.env.VITE_SERVER_URL;

export const signup = async (data) => {
	await axios
		.post(`${serverURL}user/signup`, data)
		.then((res) => res.data)
		.then(({ accessToken, user }) => {
			useStore.setState({ token: accessToken, user });
		});
};

export const login = async (data) => {
	await axios
		.post(`${serverURL}user/login`, data)
		.then((res) => res.data)
		.then(({ accessToken, user }) => {
			useStore.setState({ token: accessToken, user });
		});
};

export const logout = async () => {
	await axios.post(`${serverURL}user/logout`);
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
		await axios
			.post(`${serverURL}user/access`)
			.then((res) => res.data)
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
	await axios
		.put(`${serverURL}user/update`, data)
		.then((res) => res.data)
		.then(({ accessToken, user }) => {
			useStore.setState({ token: accessToken, user });
		});
};

export const reset = async (data) => {
	return await axios.post(`${serverURL}user/reset`, data).then((res) => {
		return { username: data.username, password: res.data.password };
	});
};
