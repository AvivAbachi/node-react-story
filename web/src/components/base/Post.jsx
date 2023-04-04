import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from './Index';

function Post({ postId, title, body, name, date, isEdit, onUpdate, onDelete }) {
	return (
		<li className='m-auto my-8 max-w-2xl'>
			<div className='-z-10 mx-8 -mb-4 flex rounded-xl bg-primary px-4 pb-6 pt-2 text-center text-white shadow-xl dark:bg-primary-dark'>
				<h4 className='w-full truncate text-lg font-bold tracking-wider' title={title}>
					{title}
				</h4>
				{onUpdate && (
					<Button icon ghost onClick={() => onUpdate({ postId, title, body })}>
						<FontAwesomeIcon icon={faPen} className='block h-[0.8rem]  w-[0.8rem]' />
					</Button>
				)}
				{onDelete && (
					<Button ghost icon onClick={() => onDelete({ postId })}>
						<FontAwesomeIcon icon={faTrashAlt} className='block h-[0.8rem]  w-[0.8rem]' />
					</Button>
				)}
			</div>
			<div className='whitespace-pre-wrap rounded-xl bg-white p-4 font-medium shadow-2xl dark:bg-primary'>
				{body}
				<div className='mx-6 mt-4 border-t border-t-gray-200 pt-2 md:mx-0 md:flex md:border-none'>
					<p className='m-auto w-fit text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-100 md:m-0'>{name}</p>
					<p className='m-auto w-fit text-sm font-semibold text-gray-400 dark:text-gray-200 md:mr-0'>
						{isEdit ? 'Created' : 'Updated'} at: {date}
					</p>
				</div>
			</div>
		</li>
	);
}

export default Post;
