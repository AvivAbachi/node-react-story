import { useMemo } from 'react';

import useStore, { modal } from '../../store';
import { inputsValidator, modalData, themeData } from '../../utils/';
import { Modal } from '../base';
import FormModal, { ResetButton } from './modal/FormModal';
import ResetSuccessModal from './modal/ResetSuccessModal';
import ThemeModal from './modal/ThemeModal';

function ModalLayout() {
	const { type, data } = useStore((state) => state.modal);
	const selectModal = useMemo(() => modalData[type], [type]);
	const inputList = useMemo(() => {
		return selectModal?.inputs?.map((type) => inputsValidator[type]);
	}, [selectModal?.inputs]);

	return (
		<Modal open={!!type} onClose={modal.closeModal}>
			{type === 'THEME' ? (
				<ThemeModal themesList={themeData} onClose={modal.closeModal} />
			) : type === 'RESET_SUCCESS' ? (
				<ResetSuccessModal password={data?.password} onClose={modal.closeModal} />
			) : type ? (
				<FormModal
					title={selectModal?.title}
					action={selectModal?.action}
					data={data}
					inputs={inputList}
					autoClose={type !== 'RESET'}
					onSubmit={selectModal?.onSubmit}
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
