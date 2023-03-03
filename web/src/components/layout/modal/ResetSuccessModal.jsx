import { setModal } from '../../../store';
import { Button, Modal } from '../../base';

function ResetSuccessModal({ password, onClose }) {
	return (
		<Modal.Content>
			<Modal.Header title='Reset Password Success' onClose={onClose} />
			<Modal.Body>
				<div className='text-center'>
					<h3 className='text-xl font-semibold tracking-wide text-gray-500'>
						Your new Password
					</h3>
					<h2 className='mt-2 mb-4 text-3xl font-semibold text-primary'>{password}</h2>
				</div>
			</Modal.Body>
			<Modal.Footer onClose={onClose}>
				<Button active onClick={() => setModal('LOGIN')}>
					Login
				</Button>
			</Modal.Footer>
		</Modal.Content>
	);
}
export default ResetSuccessModal;
