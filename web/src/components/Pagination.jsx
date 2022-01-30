import { memo, useCallback } from 'react';
import useStore from '../store';
import { setPage } from '../store/post';

const Pagination = () => {
	const page = useStore((state) => state.page);
	const pages = useStore((state) => state.pages());

	const PageBtnList = useCallback(() => {
		let p = [];
		for (let i = 0; i <= pages; i++) {
			p.push(<_PageBtn key={i} title={'Page ' + (i + 1)} active={page === i} onClick={() => setPage({ page: i })} children={i + 1} />);
		}
		return p;
	}, [pages, page]);

	return (
		<nav className='flex flex-row flex-nowrap justify-between md:justify-center items-center' aria-label='Pagination'>
			<_PageBtn titll='Previous Page' onClick={() => setPage({ back: true })} disable={page === 0}>
				<span className='sr-only'>Previous Page</span>
				<svg className='block w-4 h-4 fill-current' viewBox='0 0 256 512' aria-hidden='true' role='presentation'>
					<path d='M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z'></path>
				</svg>
			</_PageBtn>
			{PageBtnList()}
			<_PageBtn titll='Next Page' onClick={() => setPage({ next: true })} disable={page === pages}>
				<span className='sr-only'>Next Page</span>
				<svg className='block w-4 h-4 fill-current' viewBox='0 0 256 512' aria-hidden='true' role='presentation'>
					<path d='M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z'></path>
				</svg>
			</_PageBtn>
		</nav>
	);
};

const _PageBtn = memo(function PageBtn({ children, active, disable, title, page, ...props }) {
	const cls = active
		? 'border-rose-500 bg-rose-500 text-white pointer-events-none'
		: disable
		? 'border-gray-100 bg-gray-50 text-gray-300 pointer-events-none'
		: 'border-rose-100 bg-white text-black hover:border-rose-300';

	return (
		<a
			className={'md:flex w-9 h-9 mx-1 justify-center items-center rounded-full border outline-none select-none shadow-sm' + cls}
			title={title}
			href='#'
			{...props}>
			{children}
		</a>
	);
});

export default memo(Pagination);
