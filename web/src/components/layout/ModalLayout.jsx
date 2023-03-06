import { useMemo } from 'react';

import useStore, { modal } from '../../store';
import * as inputsValidator from '../../utils/inputsValidator';
import { Modal } from '../base';
import FormModal, { ResetButton } from './modal/FormModal';
import ResetSuccessModal from './modal/ResetSuccessModal';
import ThemeModal from './modal/ThemeModal';

function ModalLayout() {
	const { type, data } = useStore((state) => state.modal);
	const modalData = useMemo(() => modal.modalData[type], [type]);
	const inputList = useMemo(() => {
		return modalData?.inputs?.map((type) => inputsValidator[type]);
	}, [modalData?.inputs]);

	return (
		<Modal open={!!type} onClose={modal.closeModal}>
			{type === 'THEME' ? (
				<ThemeModal onClose={modal.closeModal} />
			) : type === 'RESET_SUCCESS' ? (
				<ResetSuccessModal password={data?.password} onClose={modal.closeModal} />
			) : type ? (
				<FormModal
					title={modalData?.title}
					action={modalData?.action}
					data={data}
					inputs={inputList}
					autoClose={type !== 'RESET'}
					onSubmit={modalData?.onSubmit}
					onClose={modal.closeModal}
				>
					{type === 'LOGIN' && (
						<ResetButton title='Reset Password' onClick={() => modal.setModal('RESET')} />
					)}
					{type === 'RESET' && (
						<ResetButton title='Back to login' onClick={() => modal.setModal('LOGIN')} />
					)}
					{type === 'DELETE_POST' && (
						<p className='mt-6'>Deleting this post will be permanently!</p>
					)}
				</FormModal>
			) : null}
		</Modal>
	);
}

export default ModalLayout;
