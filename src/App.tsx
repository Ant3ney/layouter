import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, Body } from './lib';

function App() {
	const layouterToolsOptions = {
		PUBLIC_API_KEY: 'bjwi19ta',
	};
	return (
		<div className='App'>
			<Provider options={layouterToolsOptions}>
				<Body />
			</Provider>
		</div>
	);
}

export default App;
