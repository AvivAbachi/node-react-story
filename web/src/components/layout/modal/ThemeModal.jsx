import { useCallback, useMemo } from 'react';
import useStore, { themeData } from '../../../store';
import { Label, Modal, Switch } from '../../base';

function ThemeModal({ onClose }) {
	const dark = useStore((state) => state.dark);
	const theme = useStore((state) => state.theme);

	const RadioTheme = useMemo(
		() =>
			Object.entries(themeData).map(([name, color]) => (
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

	const darkChange = useCallback(
		() => useStore.setState((state) => ({ dark: !state.dark })),
		[]
	);

	return (
		<Modal.Content>
			<Modal.Header onClose={onClose} title='Theme Colors' />
			<Modal.Body>
				<Switch title='Dark Theme' checked={dark} name='dark' onChange={darkChange} />
				<Label htmlFor='colors'>Color Themes</Label>
				{RadioTheme}
			</Modal.Body>
			<Modal.Footer onClose={onClose} />
		</Modal.Content>
	);
}
export default ThemeModal;
