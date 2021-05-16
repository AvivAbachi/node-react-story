import { memo, useContext } from 'react';
import useScreenType from 'react-screentype-hook';

import { Btn, Dropdown } from '.';
import { ModalContext, UserContext, PostContext } from '../App';
import { PlusIcon } from './Icons';

const Layout = ({ children }) => {
	const { user, logout } = useContext(UserContext);
	const { signupModal, loginModal, updateUserModal, createPostModal } = useContext(ModalContext);
	const { isUserPost, toggleUserPost } = useContext(PostContext);

	const screenType = useScreenType();

	return (
		<>
			<header>
				<nav>
					<div className='nav-title'>
						<h1>{`Story${isUserPost ? ' - My Post' : ''}`}</h1>
					</div>
					{!user.load ? (
						<div className='nav-buttons'>
							<Btn active onClick={signupModal}>
								Sign up
							</Btn>
							<Btn onClick={loginModal}>Log In</Btn>
						</div>
					) : (
						<div className='nav-buttons'>
							{!screenType.isMobile && <p className='nav-hello'>Hello, {user.show || user.username}!</p>}
							<Btn icon={screenType.isMobile} active onClick={createPostModal}>
								{screenType.isMobile ? <PlusIcon /> : 'New Post'}
							</Btn>
							<Dropdown>
								<Dropdown.Item onClick={toggleUserPost}>{isUserPost ? 'All Post' : 'My Post'}</Dropdown.Item>
								<Dropdown.Item onClick={updateUserModal}>Account</Dropdown.Item>
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
