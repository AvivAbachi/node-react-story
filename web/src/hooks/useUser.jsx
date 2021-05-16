import { useContext, useEffect, useState } from 'react';
import useLocalStorage from '@d2k/react-localstorage';
import axios from 'axios';
import { ModalContext } from '../App';

export const useUser = () => {
	const { closeModal, resetSuccessModal } = useContext(ModalContext);
	const [token, setToken, removeToken] = useLocalStorage('x-access-token');
	const [user, setUser] = useState({
		username: undefined,
		email: undefined,
		userId: undefined,
		show: undefined,
		load: false,
	});
	const serverURL = import.meta.env.VITE_SERVER_URL;

	axios.defaults.timeout = 3000;

	const singup = async (data) => {
		return await axios
			.post(`${serverURL}user/singup`, data)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
				closeModal();
			});
	};

	const login = async (data) => {
		return await axios
			.post(`${serverURL}user/login`, data)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
				closeModal();
			});
	};

	const logout = async () => {
		setUser({ load: false });
		removeToken();
		return await axios.post(`${serverURL}user/logout`);
	};

	const getAccess = async () => {
		return await axios
			.post(`${serverURL}user/access`)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				closeModal();
				setUser({ username, email, userId, show, load: true });
			})
			.catch(() => {
				setUser({ load: false });
				removeToken();
			});
	};

	const update = async (data) => {
		return await axios
			.put(`${serverURL}user/update`, data)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
			});
	};

	const reset = async (data) => {
		return await axios
			.post(`${serverURL}user/reset`, data)
			.then((res) => res.data)
			.then(({ password }) => {
				resetSuccessModal({ username: data.username, password });
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
