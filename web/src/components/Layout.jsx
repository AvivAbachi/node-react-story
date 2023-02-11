import { useMediaQuery } from 'react-responsive';
import { Btn, Dropdown, Icons, Pagination } from './index';
import useStore, { setModal, toggleUserPost, logout, setPage } from '../store';

function goToFirst() {
	toggleUserPost(false);
	setPage({ page: 0 });
}

function Layout({ children }) {
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const username = useStore((state) => state.user.username);
	const name = useStore((state) => state.user.name);
	const userPost = useStore((state) => state.userPost);

	return (
		<>
			<header className='fixed top-0 left-0 z-10 w-full bg-white px-6 shadow-lg dark:bg-gray-900'>
				<nav className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between'>
					<button onClick={goToFirst}>
						<h1 className='text-3xl font-bold text-primary'>
							Story <Icons.LogoIcon />
							{userPost ? ' My Post' : ''}
						</h1>
					</button>
					<div className='flex max-w-2xl items-center gap-5'>
						<Btn icon active onClick={() => setModal('THEME')}>
							<Icons.FaceIcon />
						</Btn>
						{!username ? (
							<>
								<Btn active onClick={() => setModal('SIGNUP')}>
									Sign up
								</Btn>
								<Btn onClick={() => setModal('LOGIN')}>Log In</Btn>
							</>
						) : (
							<>
								{!isMobile && (
									<p className='font-semibold text-gray-600 dark:text-white'>
										Hello, {name || username}!
									</p>
								)}
								<Btn icon={isMobile} active onClick={() => setModal('CREATE_POST')}>
									{isMobile ? <Icons.PlusIcon /> : 'New Post'}
								</Btn>
								<Dropdown
									ButtonChildren={
										<>
											<Icons.FaceIcon />
											<Icons.MenuIcon />
										</>
									}
								>
									<Dropdown.Item onClick={toggleUserPost}>
										{userPost ? 'All Post' : 'My Post'}
									</Dropdown.Item>
									<Dropdown.Item onClick={() => setModal('UPDATE')}>
										Account
									</Dropdown.Item>
									<Dropdown.Item border onClick={logout}>
										Logout
									</Dropdown.Item>
								</Dropdown>
							</>
						)}
					</div>
				</nav>
			</header>
			{children}
			<footer className='fixed bottom-0 left-0 mx-auto w-full bg-white px-8 py-4 text-center shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-4px_rgba(0,0,0,0.1)] dark:bg-gray-900'>
				<Pagination />
				<div className='mt-4'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				</div>
			</footer>
		</>
	);
}

export default Layout;
