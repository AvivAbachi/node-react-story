import { memo, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import useStore, { setPage } from '../store';

const Pagination = () => {
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
				<_PageBtn
					key={i}
					title={'Page ' + (i + 1)}
					active={page === i}
					onClick={() => setPage({ page: i })}
					children={i + 1}
				/>
			);
		}
		return pageBtns;
	}, [pages, page, isMobile]);

	if (pages > 0) {
		return (
			<nav className='pagination' aria-label='Pagination'>
				<_PageBtn
					titll='Previous Page'
					onClick={() => setPage({ back: true })}
					disabled={page === 0}
				>
					<svg className='block w-4 h-4 fill-current' viewBox='0 0 256 512'>
						<path d='M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z' />
					</svg>
				</_PageBtn>
				{PageBtns()}
				<_PageBtn
					titll='Next Page'
					onClick={() => setPage({ next: true })}
					disabled={page === pages}
				>
					<svg className='block w-4 h-4 fill-current' viewBox='0 0 256 512'>
						<path d='M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z' />
					</svg>
				</_PageBtn>
			</nav>
		);
	}
};

const _PageBtn = memo(function PageBtn({
	children,
	active,
	title,
	page,
	...props
}) {
	return (
		<button
			className={`pagination-btn${active ? ' pagination-btn-active' : ''}`}
			title={title}
			{...props}
		>
			{children}
		</button>
	);
});

export default memo(Pagination);
