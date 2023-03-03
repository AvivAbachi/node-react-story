import useStore, { themeData } from '../../../store';
import { Modal } from '../../base';

function ThemeModal({ onClose }) {
	const dark = useStore((state) => state.dark);
	const theme = useStore((state) => state.theme);
	return (
		<Modal.Content>
			<Modal.Header onClose={onClose} title='Theme Colors' />
			<Modal.Body>
				<label htmlFor='dark' className='input-label'>
					Dark Theme
				</label>
				<input
					type='checkbox'
					name='dark'
					checked={dark}
					onChange={() => useStore.setState({ dark: !dark })}
				/>
				<div className='toggle' onClick={() => useStore.setState({ dark: !dark })}></div>
				<label htmlFor='colors' className='input-label'>
					Color Themes
				</label>
				{Object.entries(themeData).map(([name, color]) => (
					<input
						key={name}
						type='radio'
						name='colors'
						className={color}
						checked={theme === name}
						onChange={() => useStore.setState({ theme: name })}
					/>
				))}
			</Modal.Body>
			<Modal.Footer onClose={onClose} />
		</Modal.Content>
	);
}
export default ThemeModal;
