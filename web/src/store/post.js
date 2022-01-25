import axios from 'axios';
import dataFormat from '../utils/dataFormat';

const serverURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.timeout = 3000;

const postSlice = (set, get) => ({
	post: [],
	userPost: false,
	serverError: false,

	// const [page, setPage] = useState(0);
	//?page=${page}
	// setPage((page) => page + 1);[...post, ...newPost]
	getPost: async () => {
		axios
			.get(`${serverURL}${get().userPost ? `user/${get().user.userId}` : ``}`)
			.then((res) =>
				res.data?.map(({ id, title, body, name, createdAt, updatedAt }) => {
					return { id, title, body, name, data: dataFormat(createdAt, updatedAt) };
				})
			)
			.then((data) => {
				if (data.toString() != get().post.toString()) {
					set({ post: data, serverError: false });
				}
			})
			.catch((err) => {
				console.error(err);
				set({ serverError: true });
				get().stop();
			});
	},

	toggleUserPost: () => {
		set((prev) => ({ userPost: !prev.userPost }));
		get().stop();
		get().start();
	},

	createPost: async (data) => {
		await axios.post(`${serverURL}`, data);
		get().stop();
		get().start();
	},

	updatePost: async (data) => {
		await axios.put(`${serverURL}`, data);
		get().stop();
		get().start();
	},

	deletePost: async (data) => {
		await axios.delete(`${serverURL}`, { data });
		get().stop();
		get().start();
	},

	stop: undefined,
	start: undefined,
});

export default postSlice;
