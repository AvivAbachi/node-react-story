import { useMemo } from 'react';

import useStore from '../../../store';
import { Label, Modal, Radio, Switch } from '../../base';

function ThemeModal({ themesList, onClose }) {
	const dark = useStore((state) => state.dark);
	const theme = useStore((state) => state.theme);
	const radioTheme = useMemo(() => Object.entries(themesList), [themesList]);

	return (
		<Modal.Content>
			<Modal.Header onClose={onClose} title='Theme Colors' />
			<Modal.Body>
				<Label htmlFor='dark'>Dark Theme</Label>
				<Switch
					checked={dark}
					name='dark'
					onChange={() => useStore.setState((state) => ({ dark: !state.dark }))}
				/>
				<Label htmlFor='colors'>Color Themes</Label>
				{radioTheme.map(([color, css]) => (
					<Radio
						key={color}
						name='color'
						value={color}
						className={css}
						checked={theme === color}
						onChange={(theme) => useStore.setState({ theme })}
					/>
				))}
			</Modal.Body>
			<Modal.Footer onClose={onClose} />
		</Modal.Content>
	);
}

export default ThemeModal;
