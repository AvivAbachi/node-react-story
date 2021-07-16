import { memo, useContext } from 'react';
import useScreenType from 'react-screentype-hook';

import { Btn, Dropdown, Icons } from '.';
import { ModalContext, PostContext, UserContext } from '../hooks';

const Layout = ({ children }) => {
	const { user, logout } = useContext(UserContext);
	const { handelModal } = useContext(ModalContext);
	const { userPost, toggleUserPost } = useContext(PostContext);

	const screenType = useScreenType();

	return (
		<>
			<header>
				<nav>
					<div className='nav-title'>
						<h1>{`Story${userPost ? ' - My Post' : ''}`}</h1>
					</div>
					{!user.load ? (
						<div className='nav-buttons'>
							<Btn active onClick={() => handelModal('SIGNUP')}>
								Sign up
							</Btn>
							<Btn onClick={() => handelModal('LOGIN')}>Log In</Btn>
						</div>
					) : (
						<div className='nav-buttons'>
							{!screenType.isMobile && <p className='nav-hello'>Hello, {user.show || user.username}!</p>}
							<Btn icon={screenType.isMobile} active onClick={() => handelModal('CREATE_POST')}>
								{screenType.isMobile ? <Icons.PlusIcon /> : 'New Post'}
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
			{children}
			<footer> © Copyright 2021. All Rights Reserved.</footer>
		</>
	);
};

export default memo(Layout);
