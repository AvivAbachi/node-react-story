import useStore, { post } from '../../store';
import { Pagination } from '../base/Index';

function Footer({ isMobile }) {
	const page = useStore((state) => state.page);
	const pages = useStore((state) => state.pages());

	return (
		<footer className='fixed bottom-0 left-0 mx-auto w-full bg-white px-8 py-4 text-center shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-4px_rgba(0,0,0,0.1)] dark:bg-gray-900'>
			<Pagination
				buttons={isMobile ? 5 : 9}
				current={page}
				total={pages}
				setPage={post.setPage}
			/>
			<div className='mt-4'>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit.
			</div>
		</footer>
	);
}
export default Footer;
