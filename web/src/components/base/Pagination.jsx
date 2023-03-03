import classnames from 'classnames';
import { useCallback } from 'react';

import { Icons } from './Index';

function Pagination({ buttons = 4, current = 0, total = 0, setPage }) {
	const PageBtns = useCallback(() => {
		const range = Math.min(buttons, total);
		let pageBtns = [];
		let offset =
			current < Math.floor(range / 2)
				? 0
				: current >= total - Math.floor(range / 2)
				? total - range
				: current - Math.floor(range / 2);

		for (let i = offset; i <= offset + range; i++) {
			pageBtns.push(
				<PageBtn
					key={i}
					title={'Page ' + (i + 1)}
					active={current === i}
					onClick={() => setPage({ current: i })}
				>
					{i + 1}
				</PageBtn>
			);
		}
		return pageBtns;
	}, [current, buttons, setPage, total]);

	if (total > 0) {
		return (
			<nav className='flex flex-row flex-nowrap items-center justify-between md:justify-center'>
				<PageBtn
					titll='Previous Page'
					onClick={() => setPage({ back: true })}
					disabled={current === 0}
				>
					<Icons.BackIcon />
				</PageBtn>
				{PageBtns()}
				<PageBtn
					titll='Next Page'
					onClick={() => setPage({ next: true })}
					disabled={current === total}
				>
					<Icons.NextIcon />
				</PageBtn>
			</nav>
		);
	}
}

function PageBtn({ children, active, title, disabled, ...props }) {
	return (
		<button
			className={classnames(
				'mx-1 flex h-9 w-9 select-none items-center justify-center rounded-full outline-none',
				{
					'pointer-events-none bg-primary text-white': active && !disabled,
					'pointer-events-none bg-gray-50 text-gray-300 dark:bg-transparent dark:opacity-20':
						disabled && !active,
					'bg-transparent hover:opacity-50 focus:ring-2 focus:ring-primary-light dark:bg-gray-500/10':
						active && disabled,
				}
			)}
			disabled={disabled}
			title={title}
			{...props}
		>
			{children}
		</button>
	);
}

export default Pagination;
