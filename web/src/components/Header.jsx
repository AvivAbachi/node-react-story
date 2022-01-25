import { memo, useRef } from 'react';
import shallow from 'zustand/shallow';
import { useMediaQuery } from 'react-responsive';
import useStore from '../store';
import { Btn, Dropdown, Icons } from '.';

const Header = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const { username, show } = useStore((state) => ({ username: state.user.username, show: state.user.show }));
	const userPost = useStore((state) => state.userPost);
	const logout = useRef(useStore((state) => state.logout));
	const toggleUserPost = useRef(useStore((state) => state.toggleUserPost));
	const handelModal = useRef(useStore((state) => state.handelModal));
	const signup = useRef(() => handelModal.current('SIGNUP'));
	const login = useRef(() => handelModal.current('LOGIN'));
	const createPost = useRef(() => handelModal.current('CREATE_POST'));
	const update = useRef(() => handelModal.current('UPDATE'));

	return (
		<header>
			<nav>
				<div className='nav-title'>
					<h1>{`Story${userPost ? ' - My Post' : ''}`}</h1>
				</div>
				{!username ? (
					<div className='nav-buttons'>
						<Btn active onClick={signup.current}>
							Sign up
						</Btn>
						<Btn onClick={login.current}>Log In</Btn>
					</div>
				) : (
					<div className='nav-buttons'>
						{!isMobile && <p className='nav-hello'>Hello, {show || username}!</p>}
						<Btn icon={isMobile} active onClick={createPost.current}>
							{isMobile ? <Icons.PlusIcon /> : 'New Post'}
						</Btn>
						<Dropdown>
							<Dropdown.Item onClick={toggleUserPost.current}>{userPost ? 'All Post' : 'My Post'}</Dropdown.Item>
							<Dropdown.Item onClick={update.current}>Account</Dropdown.Item>
							<Dropdown.Item border onClick={logout.current}>
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
