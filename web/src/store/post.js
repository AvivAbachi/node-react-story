import axios from 'axios';
import dataFormat from '../utils/dataFormat';

const serverURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.timeout = 3000;

const postSlice = (set, get) => {
	return {
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
					res.data?.map((p) => {
						return {
							id: p.id,
							title: p.title,
							body: p.body,
							name: p.name,
							data: dataFormat(p.createdAt, p.updatedAt),
						};
					})
				)
				.then((data) => {
					set(() => ({ post: data, serverError: false }));
				})
				.catch((err) => {
					console.error(err);
					set(() => ({ serverError: true }));
					get().stop();
				});
		},

		toggleUserPost: () => {
			set((prev) => ({ userPost: !prev.userPost }));
			get().reloadPost();
		},

		createPost: async (data) => {
			await axios.post(`${serverURL}`, data);
			get().reloadPost();
		},

		updatePost: async (data) => {
			await axios.put(`${serverURL}`, data);
			get().reloadPost();
		},

		deletePost: async (data) => {
			await axios.delete(`${serverURL}`, { data });
			get().reloadPost();
		},
		reloadPost: () => {
			get().stop();
			get().start();
		},

		stop: undefined,
		start: undefined,
	};
};

export default postSlice;
