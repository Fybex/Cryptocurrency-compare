import React from 'react';
import './Button.scss';

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
};

export default function Button(props: ButtonProps) {
	const { children, onClick, className } = props;

	return (
		<div className={className}>
			<button onClick={onClick} className='button'>
				{children}
			</button>
		</div>
	);
}
