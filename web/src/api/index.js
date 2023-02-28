import axios from 'axios';
export * as post from './post';
export * as user from './user';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export default axios;
