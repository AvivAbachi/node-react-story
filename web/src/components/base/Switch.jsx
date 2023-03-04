import { Label } from '.';

function Switch({ checked, title, name, onChange }) {
	return (
		<>
			<Label htmlFor={name}>{title || name}</Label>
			<input type='checkbox' name={name} checked={checked} onChange={onChange} />
			<div className='toggle' onClick={onChange}></div>
		</>
	);
}

export default Switch;
