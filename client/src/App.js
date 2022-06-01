import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pair from './components/Pair/Pair';
import Pairs from './components/Pairs/Pairs';
import './App.scss';

export default function App() {
	return (
		<div className='App'>
			<div className='wrapper'>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Pairs />} />
						<Route path='/:symbol' element={<Pairs />} />
						<Route path='/:symbol/:symbol2' element={<Pair />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}
