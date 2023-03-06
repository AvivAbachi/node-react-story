import useStore from '.';

export function setModal(type, data) {
	useStore.setState({ modal: { type, data } });
}

export function closeModal() {
	setModal();
}
