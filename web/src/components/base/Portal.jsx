import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children, id }) {
	const [element, setElement] = useState();

	useEffect(() => {
		let el = document.getElementById(id);
		let systemCreated = false;
		if (!el) {
			systemCreated = true;
			el = document.createElement('div');
			el.setAttribute('id', id);
			document.body.appendChild(el);
		}
		setElement(el);

		return () => {
			if (systemCreated && el.parentNode) {
				el.parentNode.removeChild(el);
			}
		};
	}, [id]);

	return element ? createPortal(children, element) : null;
}

export default Portal;
