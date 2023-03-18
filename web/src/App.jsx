import { useCallback, useEffect } from 'react';
import { useQueryClient, useQuery } from 'react-query';

import storyApi, { post as postApi } from './api';
import { Footer, List, ModalLayout, Navbar } from './components/layout/';
import useBreakpoint from './hooks/useBreakpoint';
import useStore, { modal, user } from './store';

const App = () => {
	const isMobile = useBreakpoint(768);
	const token = useStore((state) => state.token);
	const theme = useStore((state) => state.theme);
	const dark = useStore((state) => state.dark);
	const pages = useStore((state) => state.pages());

	const userPost = useStore((state) => state.userPost);
	const userId = useStore((state) => state.user?.userId);
	const limit = useStore((state) => state.limit);
	const page = useStore((state) => state.page);

	const posts = useQuery(
		['post', { page }],
		useCallback(
			async () =>
				userPost
					? await postApi.getUserPost(userId, limit, page)
					: await postApi.getPost(limit, page),
			[limit, page, userId, userPost]
		),
		{
			onSuccess: (res) => {
				useStore.getState().setTotal(res.total);
				return res;
			},
		}
	);

	useEffect(() => {
		//clitet.fetchQuery('todos');
	}, [page]);

	useEffect(() => {
		storyApi.defaults.headers['Authorization'] = token;
	}, [token]);

	useEffect(() => {
		document.documentElement.className = `${theme}${dark ? ' dark' : ''}`;
	}, [dark, theme]);

	useEffect(() => {
		user.getAccess();
		// user.start();
	}, []);

	return (
		<>
			<Navbar isMobile={isMobile} />
			<List
				post={posts.data?.post}
				userPost={userPost}
				isLoading={posts.isLoading}
				isError={posts.isError}
				onDelete={(post) => modal.setModal('DELETE_POST', post)}
				onUpdate={(post) => modal.setModal('UPDATE_POST', post)}
				onTryAgain={undefined}
			/>
			<Footer isMobile={isMobile} />
			<ModalLayout />
		</>
	);
};

export default App;
