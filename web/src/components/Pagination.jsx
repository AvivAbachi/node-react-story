import { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import useStore, { setPage } from '../store';
import { Icons } from './index';
import classNames from 'classnames';
function Pagination() {
	const isMobile = useMediaQuery({ maxWidth: 768 });
	const page = useStore((state) => state.page);
	const pages = useStore((state) => state.pages());

	const PageBtns = useCallback(() => {
		const range = Math.min(isMobile ? 4 : 8, pages);
		let pageBtns = [];
		let offset =
			page < Math.floor(range / 2)
				? 0
				: page >= pages - Math.floor(range / 2)
				? pages - range
				: page - Math.floor(range / 2);

		for (let i = offset; i <= offset + range; i++) {
			pageBtns.push(
				<PageBtn
					key={i}
					title={'Page ' + (i + 1)}
					active={page === i}
					onClick={() => setPage({ page: i })}
				>
					{i + 1}
				</PageBtn>
			);
		}
		return pageBtns;
	}, [pages, page, isMobile]);

	if (pages > 0) {
		return (
			<nav className='flex flex-row flex-nowrap items-center justify-between md:justify-center'>
				<PageBtn
					titll='Previous Page'
					onClick={() => setPage({ back: true })}
					disabled={page === 0}
				>
					<Icons.BackIcon />
				</PageBtn>
				{PageBtns()}
				<PageBtn
					titll='Next Page'
					onClick={() => setPage({ next: true })}
					disabled={page === pages}
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
			className={classNames(
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
