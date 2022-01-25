import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.timeout = 3000;

const userSlice = (set, get) => {
	return {
		user: {
			username: undefined,
			email: undefined,
			userId: undefined,
			show: undefined,
		},
		load: false,
		token: undefined,

		signup: async (data) => {
			await axios
				.post(`${serverURL}user/singup`, data)
				.then((res) => res.data)
				.then(({ accessToken, user }) => {
					set(() => ({ token: accessToken, user, load: true }));
					axios.defaults.headers['x-access-token'] = accessToken;
					get().setToken(accessToken);
				});
		},

		login: async (data) => {
			await axios
				.post(`${serverURL}user/login`, data)
				.then((res) => res.data)
				.then(({ accessToken, user }) => {
					set(() => ({ token: accessToken, user, load: true }));
					axios.defaults.headers['x-access-token'] = accessToken;
					get().setToken(accessToken);
				});
		},

		logout: async () => {
			await axios.post(`${serverURL}user/logout`);
			set(() => ({
				user: {
					username: undefined,
					email: undefined,
					userId: undefined,
					show: undefined,
					load: false,
				},
				token: undefined,
			}));
			axios.defaults.headers['x-access-token'] = undefined;
			get().removeToken();
		},

		getAccess: async () => {
			axios.defaults.headers['x-access-token'] = get().token;
			await axios
				.post(`${serverURL}user/access`)
				.then((res) => res.data)
				.then(({ accessToken, user }) => {
					set(() => ({ token: accessToken, user, load: true }));
					axios.defaults.headers['x-access-token'] = accessToken;
					get().setToken(accessToken);
				})
				.catch((err) => {
					if (err?.response?.status === 401 || err?.response?.status === 403) {
						// get().logout();
					}
				});
		},

		update: async (data) => {
			await axios
				.put(`${serverURL}user/update`, data)
				.then((res) => res.data)
				.then(({ accessToken, user }) => {
					set(() => ({ token: accessToken, user, load: true }));
					get().setToken(accessToken);
				});
		},

		reset: async (data) => {
			return await axios.post(`${serverURL}user/reset`, data).then((res) => {
				return { username: data.username, password: res.data.password };
			});
		},

		setToken: undefined,
		removeToken: undefined,
	};
};

export default userSlice;
