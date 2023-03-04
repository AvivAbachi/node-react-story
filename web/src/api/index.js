import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers['Access-Control-Allow-Methods'] = '*';

export * as post from './post';
export * as user from './user';
export default axios;
