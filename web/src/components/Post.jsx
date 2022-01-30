import { memo, useCallback } from 'react';
import { Btn, Icons } from '.';

const Post = ({ title, body, name, date, onUpdate, onDelete }) => {
	const buildBody = useCallback(() => body.split(/(?:\r\n|\r|\n)/gm).map((text, i) => <p key={i}>{text}</p>), [body]);
	return (
		<li className='post'>
			<div className='post-header'>
				<h4 className='post-title'>{title}</h4>
				{onUpdate && <Btn ghost onClick={onUpdate} children={<Icons.EditIcon />} />}
				{onDelete && <Btn ghost onClick={onDelete} children={<Icons.TrashIcon />} />}
			</div>
			<div className='post-body'>{buildBody()}</div>
			<div className='post-footer'>
				<p className='post-username'>{name}</p>
				<p className='post-date'>{date}</p>
			</div>
		</li>
	);
};
export default memo(Post);
