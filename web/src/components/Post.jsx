import { Btn, Icons } from './index';

function Post({ title, body, name, date, onUpdate, onDelete }) {
	return (
		<li className='post'>
			<div className='post-header'>
				<h4 className='post-title' title={title}>
					{title}
				</h4>
				{onUpdate && (
					<Btn ghost onClick={onUpdate}>
						<Icons.EditIcon />
					</Btn>
				)}
				{onDelete && (
					<Btn ghost onClick={onDelete}>
						<Icons.TrashIcon />
					</Btn>
				)}
			</div>
			<div className='post-body'>
				{body}
				<div className='post-footer'>
					<p className='post-username'>{name}</p>
					<p className='post-date'>{date}</p>
				</div>
			</div>
		</li>
	);
}

export default Post;
