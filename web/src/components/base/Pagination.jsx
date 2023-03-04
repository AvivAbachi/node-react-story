import classnames from 'classnames';
import { useMemo } from 'react';

import { ReactComponent as BackIcon } from '../../assets/back.svg';
import { ReactComponent as NextIcon } from '../../assets/next.svg';

function Pagination({ buttons = 5, current = 0, total = 0, setPage }) {
	const pages = useMemo(() => {
		const range = Math.max(Math.min(buttons, total), 0);
		const offset =
			current < Math.floor(range / 2)
				? 0
				: current >= total - Math.floor(range / 2)
				? total - range + 1
				: current - Math.floor(range / 2);

		return [...Array(range).keys()].map((i) => i + offset);
	}, [buttons, current, total]);

	if (total > 0) {
		return (
			<nav className='flex flex-row flex-nowrap items-center justify-between md:justify-center'>
				<PageBtn
					titll='Previous Page'
					onClick={() => setPage({ back: true })}
					disabled={current === 0}
				>
					<BackIcon />
				</PageBtn>
				{pages.map((i) => (
					<PageBtn
						key={i}
						title={'Page ' + (i + 1)}
						onClick={() => setPage({ page: i })}
						active={current === i}
					>
						{i + 1}
					</PageBtn>
				))}
				<PageBtn
					titll='Next Page'
					onClick={() => setPage({ next: true })}
					disabled={current === total}
				>
					<NextIcon />
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
