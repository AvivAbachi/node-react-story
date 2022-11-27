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
		<div className='list-error'>
			<h2 className='list-error-title'>No Connection...</h2>
			<p className='list-error-text'>Please check your connection or try again.</p>
			<Btn active onClick={tryAgain}>
				Try again
			</Btn>
		</div>
	);
}

export default ListError;
