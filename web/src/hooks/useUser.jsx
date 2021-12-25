import { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '@d2k/react-localstorage';
import axios from 'axios';
import { ModalContext } from '.';

const serverURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.timeout = 3000;

const useUser = () => {
	const { handelModal } = useContext(ModalContext);
	const [token, setToken, removeToken] = useLocalStorage('x-access-token');
	const [user, setUser] = useState({
		username: undefined,
		email: undefined,
		userId: undefined,
		show: undefined,
		load: false,
	});

	const singup = async (data) => {
		await axios
			.post(`${serverURL}user/singup`, data)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
			});
	};

	const login = async (data) => {
		await axios
			.post(`${serverURL}user/login`, data)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
			});
	};

	const logout = async () => {
		setUser({ load: false });
		removeToken();
		await axios.post(`${serverURL}user/logout`);
	};

	const getAccess = async () => {
		await axios
			.post(`${serverURL}user/access`)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
			})
			.catch((err) => {
				if (err?.response?.status === 401 || err?.response?.status === 403) {
					setUser({ load: false });
					removeToken();
				}
			});
	};

	const update = async (data) => {
		await axios
			.put(`${serverURL}user/update`, data)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
			});
	};

	const reset = async (data) => {
		return await axios.post(`${serverURL}user/reset`, data).then((res) => {
			return { username: data.username, password: res.data.password };
		});
	};

	useEffect(() => {
		if (token) {
			axios.defaults.headers['x-access-token'] = token;
			getAccess();
		}
	}, [token]);

	return {
		user,
		singup,
		login,
		logout,
		update,
		reset,
	};
};

export const UserContext = createContext(useUser);

const UserProvider = ({ children }) => {
	const user = useUser();
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
