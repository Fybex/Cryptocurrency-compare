import React from 'react';
import './Button.scss';

export default function Button(props) {
	const { children, onClick, className } = props;

	return (
		<div className={className}>
			<button onClick={onClick}>{children}</button>
		</div>
	);
}
