import React, { useContext, useEffect, useState } from 'react';
import useLocalStorage from '@d2k/react-localstorage';
import axios from 'axios';
import { UIContext } from '../App';

const SERVER_URL = 'http://192.168.1.184:5000/';

export const useUser = () => {
	const { closeModal, resetSuccessModal } = useContext(UIContext);
	const [token, setToken, removeToken] = useLocalStorage('x-access-token');
	const [user, setUser] = useState({
		username: undefined,
		email: undefined,
		userId: undefined,
		show: undefined,
		load: false,
	});

	axios.defaults.timeout = 3000;

	const singup = async (data) => {
		return await axios
			.post(`${SERVER_URL}user/singup`, data)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
				closeModal();
			});
	};

	const login = async (data) => {
		return await axios
			.post(`${SERVER_URL}user/login`, data)
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
		return await axios.post(`${SERVER_URL}user/logout`);
	};

	const getAccess = async () => {
		return await axios
			.post(`${SERVER_URL}user/access`)
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
			.put(`${SERVER_URL}user/update`, data)
			.then((res) => res.data)
			.then(({ accessToken, user: { username, email, userId, show } }) => {
				setToken(accessToken);
				setUser({ username, email, userId, show, load: true });
			});
	};

	const reset = async (data) => {
		return await axios
			.post(`${SERVER_URL}user/reset`, data)
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
