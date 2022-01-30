import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Btn, Dropdown, Icons } from '.';
import useStore, { handelModal, toggleUserPost, logout } from '../store';

const Navbar = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const username = useStore((state) => state.user.username);
	const show = useStore((state) => state.user.show);
	const userPost = useStore((state) => state.userPost);

	return (
		<header>
			<nav>
				<div className='nav-title'>
					<h1>{`Story${userPost ? ' - My Post' : ''}`}</h1>
				</div>
				{!username ? (
					<div className='nav-buttons'>
						<Btn active onClick={() => handelModal('SIGNUP')}>
							Sign up
						</Btn>
						<Btn onClick={() => handelModal('LOGIN')}>Log In</Btn>
					</div>
				) : (
					<div className='nav-buttons'>
						{!isMobile && <p className='nav-hello'>Hello, {show || username}!</p>}
						<Btn icon={isMobile} active onClick={() => handelModal('CREATE_POST')}>
							{isMobile ? <Icons.PlusIcon /> : 'New Post'}
						</Btn>
						<Dropdown>
							<Dropdown.Item onClick={toggleUserPost}>{userPost ? 'All Post' : 'My Post'}</Dropdown.Item>
							<Dropdown.Item onClick={() => handelModal('UPDATE')}>Account</Dropdown.Item>
							<Dropdown.Item border onClick={logout}>
								Logout
							</Dropdown.Item>
						</Dropdown>
					</div>
				)}
			</nav>
		</header>
	);
};

export default memo(Navbar);
