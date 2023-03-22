import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { Button } from './Index';

function Post({ postId, title, body, name, date, isEdit, onUpdate, onDelete }) {
	return (
		<li className='m-auto my-8 max-w-2xl'>
			<div className='-z-10 mx-8 -mb-4 flex rounded-xl bg-primary px-4 pb-6 pt-2 text-center text-white shadow-xl dark:bg-primary-dark'>
				<h4 className='w-full truncate text-lg font-bold tracking-wider' title={title}>
					{title}
				</h4>
				{onUpdate && (
					<Button
						className='h-7 w-7 p-1'
						ghost
						onClick={() => onUpdate({ postId, title, body })}
					>
						<EditIcon className='block h-6 w-6 fill-current p-0.5' />
					</Button>
				)}
				{onDelete && (
					<Button className='h-7 w-7 p-1' ghost onClick={() => onDelete({ postId })}>
						<DeleteIcon className='block h-5 w-5 fill-current stroke-current p-0.5' />
					</Button>
				)}
			</div>
			<div className='whitespace-pre-wrap rounded-xl bg-white p-4 font-medium shadow-2xl dark:bg-primary'>
				{body}
				<div className='mx-6 mt-4 border-t border-t-gray-200 pt-2 md:mx-0 md:flex md:border-none'>
					<p className='m-auto w-fit text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-100 md:m-0'>
						{name}
					</p>
					<p className='m-auto w-fit text-sm font-semibold text-gray-400 dark:text-gray-200 md:mr-0'>
						{isEdit ? 'Created' : 'Updated'} at: {date}
					</p>
				</div>
			</div>
		</li>
	);
}

export default Post;
