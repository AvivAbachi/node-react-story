import { memo, useContext, useMemo, useRef } from 'react';
import dataFormat from '../utils/dataFormat';
import { Btn, Icons } from '.';
import { ModalContext } from '../hooks';

const Post = ({ id, userId, title, body, show, createdAt, updatedAt, userPost }) => {
	const { handelModal } = useContext(ModalContext);
	const date = useRef(dataFormat(createdAt, updatedAt));
	const getBody = useMemo(() => body.split(/(?:\r\n|\r|\n)/gm).map((text, i) => <p key={i}>{text}</p>), [body]);
	return (
		<li className='post'>
			<div className='post-header'>
				<h4 className='post-title'>{title}</h4>
				{userPost && (
					<>
						<Btn ghost onClick={() => handelModal('UPDATE_POST', { id })}>
							<Icons.EditIcon />
						</Btn>
						<Btn ghost onClick={() => handelModal('DELETE_POST', { id })}>
							<Icons.TrashIcon />
						</Btn>
					</>
				)}
			</div>
			<div className='post-body'>{getBody}</div>
			<div className='post-footer'>
				<p className='post-username'>{show}</p>
				<p className='post-date'>{date.current}</p>
			</div>
		</li>
	);
};
export default memo(Post);
