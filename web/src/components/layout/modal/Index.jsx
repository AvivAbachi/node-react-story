import useStore, { modal } from '../../../store';
import { Modal } from '../../base';
import FormModal from './FormModal';
import ResetSuccessModal from './ResetSuccessModal';
import ThemeModal from './ThemeModal';

function ModalLayout() {
	const { type, data } = useStore((state) => state.modal);

	return (
		<Modal open={!!type} onClose={modal.closeModal}>
			{type === 'THEME' ? (
				<ThemeModal onClose={modal.closeModal} />
			) : type === 'RESET_SUCCESS' ? (
				<ResetSuccessModal password={data?.password} onClose={modal.closeModal} />
			) : (
				<FormModal type={type} data={data} onClose={modal.closeModal} />
			)}
		</Modal>
	);
}

export default ModalLayout;
