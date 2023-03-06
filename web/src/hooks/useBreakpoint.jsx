import { useCallback, useEffect, useState } from 'react';

function calcBreakpoint(windowWidth, point, bigger) {
	return bigger ? windowWidth >= point : windowWidth < point;
}

function useBreakpoint(point = 1024, bigger = false) {
	const [isBreak, setBreak] = useState(calcBreakpoint(window.innerWidth, point, bigger));

	const handleResize = useCallback(() => {
		setBreak(calcBreakpoint(window.innerWidth, point, bigger));
	}, [bigger, point]);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	return isBreak;
}

export default useBreakpoint;
