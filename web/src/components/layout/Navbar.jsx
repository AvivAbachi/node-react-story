import useStore, { logout, setModal, setPage, toggleUserPost } from '../../store';
import { Button, Dropdown, Icons } from '../base/Index';

function goToFirst() {
	toggleUserPost(false);
	setPage({ page: 0 });
}

function Navbar({ isMobile }) {
	const username = useStore((state) => state.user.username);
	const name = useStore((state) => state.user.name);
	const userPost = useStore((state) => state.userPost);
	return (
		<header className='fixed top-0 left-0 z-10 w-full bg-white px-6 shadow-lg dark:bg-gray-900'>
			<nav className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between'>
				<button onClick={goToFirst}>
					<h1 className='text-3xl font-bold text-primary'>
						Story <Icons.LogoIcon />
						{userPost ? ' My Post' : ''}
					</h1>
				</button>
				<div className='flex max-w-2xl items-center gap-5'>
					<Button icon active onClick={() => setModal('THEME')}>
						<Icons.FaceIcon />
					</Button>
					{!username ? (
						<>
							<Button active onClick={() => setModal('SIGNUP')}>
								Sign up
							</Button>
							<Button onClick={() => setModal('LOGIN')}>Log In</Button>
						</>
					) : (
						<>
							{!isMobile && (
								<p className='font-semibold text-gray-600 dark:text-white'>
									Hello, {name || username}!
								</p>
							)}
							<Button icon={isMobile} active onClick={() => setModal('CREATE_POST')}>
								{isMobile ? <Icons.PlusIcon /> : 'New Post'}
							</Button>
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
								<Dropdown.Item onClick={() => setModal('UPDATE')}>Account</Dropdown.Item>
								<Dropdown.Item border onClick={logout}>
									Logout
								</Dropdown.Item>
							</Dropdown>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
export default Navbar;
