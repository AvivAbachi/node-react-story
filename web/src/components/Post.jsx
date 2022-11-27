import { Btn, Icons } from '.';

function Post({ title, body, name, date, onUpdate, onDelete }) {
	return (
		<li className='post'>
			<div className='post-header'>
				<h4 className='post-title' title={title}>
					{title}
				</h4>
				{onUpdate && (
					<Btn ghost onClick={onUpdate} children={<Icons.EditIcon />} />
				)}
				{onDelete && (
					<Btn ghost onClick={onDelete} children={<Icons.TrashIcon />} />
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
