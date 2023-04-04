import { faBars, faCircleUser, faPlus, faSwatchbook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import useStore, { modal, post, user } from '../../store';
import { Button, Dropdown } from '../base/Index';

function goToFirst() {
	post.toggleUserPost(false);
	post.setPage({ page: 0 });
}

function Navbar({ isMobile }) {
	const { username, name } = useStore((state) => state.user);
	const userPost = useStore((state) => state.userPost);

	return (
		<header className='fixed top-0 left-0 z-10 w-full bg-white px-6 shadow-lg dark:bg-gray-900'>
			<nav className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between'>
				<button onClick={goToFirst}>
					<h1 className='text-3xl font-bold text-primary flex items-center'>
						Story
						<LogoIcon className='h-8 w-8 mx-2' />
						{userPost ? '  My Post' : ''}
					</h1>
				</button>
				<div className='flex max-w-2xl items-center gap-5'>
					<Button icon active onClick={() => modal.setModal('THEME')}>
						<FontAwesomeIcon icon={faSwatchbook} className='h-4 w-4 mx-1' />
					</Button>
					{!username ? (
						<>
							<Button active onClick={() => modal.setModal('SIGNUP')}>
								Sign up
							</Button>
							<Button onClick={() => modal.setModal('LOGIN')}>Log In</Button>
						</>
					) : (
						<>
							{!isMobile && <p className='font-semibold text-gray-600 dark:text-white'>Hello, {name || username}!</p>}
							<Button icon={isMobile} active onClick={() => modal.setModal('CREATE_POST')}>
								{isMobile ? <FontAwesomeIcon icon={faPlus} className='h-4 w-4 mx-1' /> : 'New Post'}
							</Button>
							<Dropdown
								ButtonChildren={
									<>
										<FontAwesomeIcon icon={faCircleUser} className='h-6 w-6' />
										<FontAwesomeIcon icon={faBars} className='h-6 w-6 mx-1' />
									</>
								}
							>
								<Dropdown.Item onClick={post.toggleUserPost}>{userPost ? 'All Post' : 'My Post'}</Dropdown.Item>
								<Dropdown.Item onClick={() => modal.setModal('UPDATE')}>Account</Dropdown.Item>
								<Dropdown.Item border onClick={user.logout}>
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
