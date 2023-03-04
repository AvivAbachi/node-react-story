import { useMemo } from 'react';

import useStore, { modal } from '../../../store';
import { Label, Modal, Switch } from '../../base';

function ThemeModal({ onClose }) {
	const dark = useStore((state) => state.dark);
	const theme = useStore((state) => state.theme);

	const RadioTheme = useMemo(
		() =>
			Object.entries(modal.themeData).map(([name, color]) => (
				<input
					key={name}
					type='radio'
					name='colors'
					className={color}
					checked={theme === name}
					onChange={() => useStore.setState({ theme: name })}
				/>
			)),
		[theme]
	);

	return (
		<Modal.Content>
			<Modal.Header onClose={onClose} title='Theme Colors' />
			<Modal.Body>
				<Switch
					title='Dark Theme'
					checked={dark}
					name='dark'
					onChange={() => useStore.setState((state) => ({ dark: !state.dark }))}
				/>
				<Label htmlFor='colors'>Color Themes</Label>
				{RadioTheme}
			</Modal.Body>
			<Modal.Footer onClose={onClose} />
		</Modal.Content>
	);
}

export default ThemeModal;
