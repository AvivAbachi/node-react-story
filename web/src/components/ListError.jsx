import { Btn } from './index';
import useStore, { getAccess } from '../store';

const tryAgain = () => {
	getAccess();
	const { start, stop } = useStore.getState().interval;
	stop();
	start();
};

function ListError() {
	return (
		<div className='mx-auto mt-16 w-96 text-center'>
			<h2 className='text-4xl font-bold text-gray-700'>No Connection...</h2>
			<p className='mt-1 mb-5 inline-block text-gray-500'>
				Please check your connection or try again.
			</p>
			<Btn className='m-auto' active onClick={tryAgain}>
				Try again
			</Btn>
		</div>
	);
}

export default ListError;
