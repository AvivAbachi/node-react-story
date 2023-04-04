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

export async function logout(localOnly = false) {
	if (!localOnly) await api.logout();
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
			.catch(async (err) => {
				if (err?.response?.status === 401) await logout(true);
			});
	}
}

export async function update(data) {
	await api.update(data).then(({ accessToken, user }) => {
		useStore.setState({ token: accessToken, user });
	});
}

export async function reset(data) {
	await api.reset(data).then(({ password }) => {
		modal.setModal('RESET_SUCCESS', { username: data.username, password });
	});
}

export async function start() {
	await getAccess();
	await post.getPost();
}
