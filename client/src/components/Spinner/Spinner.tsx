import React from 'react';
import { BounceLoader } from 'react-spinners';
import './Spinner.scss';

export default function Spinner() {
	return (
		<div className='spinner'>
			<BounceLoader size={150} color='#827397' />
		</div>
	);
}
