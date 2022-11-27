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
			<header>
				<nav>
					<button onClick={goToFirst}>
						<h1 className='nav-title'>
							Story <Icons.LogoIcon />
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
								{!isMobile && <p className='nav-hello'>Hello, {name || username}!</p>}
								<Btn icon={isMobile} active onClick={() => setModal('CREATE_POST')}>
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
