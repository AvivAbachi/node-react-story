import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.timeout = 3000;

const userSlice = (set, get) => ({
	token: undefined,
	user: {
		username: undefined,
		email: undefined,
		userId: undefined,
		show: undefined,
	},

	signup: async (data) => {
		await axios
			.post(`${serverURL}user/singup`, data)
			.then((res) => res.data)
			.then(({ accessToken, user }) => {
				set({ token: accessToken, user });
				// axios.defaults.headers['x-access-token'] = accessToken;
			});
	},

	login: async (data) => {
		await axios
			.post(`${serverURL}user/login`, data)
			.then((res) => res.data)
			.then(({ accessToken, user }) => {
				set({ token: accessToken, user });
				// axios.defaults.headers['x-access-token'] = accessToken;
			});
	},

	logout: async () => {
		await axios.post(`${serverURL}user/logout`);
		set({
			user: { username: undefined, email: undefined, userId: undefined, show: undefined },
			token: undefined,
		});
		// axios.defaults.headers['x-access-token'] = undefined;
	},

	getAccess: async () => {
		//axios.defaults.headers['x-access-token'] = get().token;
		await axios
			.post(`${serverURL}user/access`)
			.then((res) => res.data)
			.then(({ accessToken, user }) => {
				set({ token: accessToken, user });
				// axios.defaults.headers['x-access-token'] = accessToken;
			})
			.catch((err) => {
				if (err?.response?.status === 401 || err?.response?.status === 403) {
					get().logout();
				}
			});
	},

	update: async (data) => {
		await axios
			.put(`${serverURL}user/update`, data)
			.then((res) => res.data)
			.then(({ accessToken, user }) => {
				set({ token: accessToken, user });
			});
	},

	reset: async (data) => {
		return await axios.post(`${serverURL}user/reset`, data).then((res) => {
			return { username: data.username, password: res.data.password };
		});
	},
});

export default userSlice;
