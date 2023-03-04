import useStore, { modal, post } from '.';
import { user as api } from '../api';

export async function signup(data) {
	await api.signup(data).then(({ accessToken, user }) => {
		useStore.setState({ token: accessToken, user });
	});
}

export async function login(data) {
	await api.login(data).then(({ accessToken, user }) => {
		useStore.setState({ token: accessToken, user });
	});
}

export async function logout() {
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
}

export async function getAccess() {
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
}

export async function update(data) {
	await api.update(data).then(({ accessToken, user }) => {
		useStore.setState({ token: accessToken, user });
	});
}

export async function reset(data) {
	const res = await api
		.reset(data)
		.then(({ password }) => ({ username: data.username, password }));

	modal.setModal('RESET_SUCCESS', res);
}

export async function start() {
	await getAccess();
	await post.getPost();
}
