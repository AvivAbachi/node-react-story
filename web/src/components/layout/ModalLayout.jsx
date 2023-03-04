import useStore, { modal } from '../../store';
import { Modal } from '../base';
import FormModal from './modal/FormModal';
import ResetSuccessModal from './modal/ResetSuccessModal';
import ThemeModal from './modal/ThemeModal';

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
