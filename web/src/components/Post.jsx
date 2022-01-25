import { memo, useCallback, useMemo, useRef } from 'react';
import { Btn, Icons } from '.';
import useStore from '../store';

const Post = ({ id, title, body, name, data, userPost }) => {
	const handelModal = useRef(useStore.getState().handelModal);
	const updatePost = useCallback(() => handelModal.current('UPDATE_POST', { id, title, body }), [handelModal, id, title, body]);
	const deltePost = useCallback(() => handelModal.current('DELETE_POST', { id }), [handelModal, id]);
	const buildBody = useMemo(() => body.split(/(?:\r\n|\r|\n)/gm).map((text, i) => <p key={i}>{text}</p>), [body]);
	return (
		<li className='post'>
			<div className='post-header'>
				<h4 className='post-title'>{title}</h4>
				{userPost && (
					<>
						<Btn ghost onClick={updatePost}>
							<Icons.EditIcon />
						</Btn>
						<Btn ghost onClick={deltePost}>
							<Icons.TrashIcon />
						</Btn>
					</>
				)}
			</div>
			<div className='post-body'>{buildBody}</div>
			<div className='post-footer'>
				<p className='post-username'>{name}</p>
				<p className='post-date'>{data}</p>
			</div>
		</li>
	);
};
export default memo(Post);
