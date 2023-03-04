import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

function Portal({ children, id }) {
	const [element, setElement] = useState();

	useLayoutEffect(() => {
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

	if (!element) return null;
	return createPortal(children, element);
}

export default Portal;
