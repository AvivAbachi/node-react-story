import React, { memo, useMemo, useRef } from 'react';
import dataFormat from '../utils/dataFormat';

const Post = ({ title, body, show, createdAt, updatedAt }) => {
	const date = useRef(dataFormat(createdAt, updatedAt));
	const getBody = useMemo(() => body.split(/(?:\r\n|\r|\n)/gm).map((text, i) => <p key={i}>{text}</p>), [body]);
	return (
		<li className='post'>
			<div>{show}</div>
			<h4>{title}</h4>
			{getBody}
			<div>{date.current}</div>
		</li>
	);
};
export default memo(Post);
