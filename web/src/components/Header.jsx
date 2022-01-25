import { memo } from 'react';
import useScreenType from 'react-screentype-hook';
import { Btn, Dropdown, Icons } from '.';
import useStore, { selector } from '../store';

const Header = () => {
	const { isMobile } = useScreenType();
	const load = useStore(selector.load);
	const user = useStore(selector.user);
	const userPost = useStore(selector.updatePost);

	const logout = useStore.getState().logout;
	const toggleUserPost = useStore.getState().toggleUserPost;
	const handelModal = useStore.getState().handelModal;

	return (
		<header>
			<nav>
				<div className='nav-title'>
					<h1>{`Story${userPost ? ' - My Post' : ''}`}</h1>
				</div>
				{!load ? (
					<div className='nav-buttons'>
						<Btn active onClick={() => handelModal('SIGNUP')}>
							Sign up
						</Btn>
						<Btn onClick={() => handelModal('LOGIN')}>Log In</Btn>
					</div>
				) : (
					<div className='nav-buttons'>
						{!isMobile && <p className='nav-hello'>Hello, {user.show || user.username}!</p>}
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

export default memo(Header);
