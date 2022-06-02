import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Pair from './components/Pair/Pair';
import Pairs from './components/Pairs/Pairs';
import './App.scss';

export default function App() {
	return (
		<div className='App'>
			<div className='wrapper'>
				<HashRouter>
					<Routes>
						<Route path='/' element={<Pairs />} />
						<Route path='/:symbol' element={<Pairs />} />
						<Route path='/:symbol/:symbol2' element={<Pair />} />
					</Routes>
				</HashRouter>
			</div>
		</div>
	);
}
