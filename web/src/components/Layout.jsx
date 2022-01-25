import { useCallback } from 'react';
import { memo, useRef } from 'react';
import useScreenType from 'react-screentype-hook';
import shallow from 'zustand/shallow';
import { Btn, Dropdown, Icons } from '.';
import useStore, { selector } from '../store';

const Layout = ({ children }) => {
	return <>{children}</>;
};

export default memo(Layout);
