import { useMediaQuery } from 'react-responsive';
import { Btn, Dropdown, Icons, Pagination } from '.';
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
			<header>
				<nav>
					<button onClick={goToFirst}>
						<h1 className='nav-title'>
							{'Story '}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8 inline'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
								/>
							</svg>
							{userPost ? ' My Post' : ''}
						</h1>
					</button>
					<div className='nav-buttons'>
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
									<p className='nav-hello'>Hello, {name || username}!</p>
								)}
								<Btn
									icon={isMobile}
									active
									onClick={() => setModal('CREATE_POST')}
								>
									{isMobile ? <Icons.PlusIcon /> : 'New Post'}
								</Btn>
								<Dropdown
									Btn={
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
			<footer>
				<Pagination />
				<div className='mt-4'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				</div>
			</footer>
		</>
	);
}

export default Layout;