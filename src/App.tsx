import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, Body } from './lib';
import LandingScreen from './components/LandingScreen';
import FunnelItem01 from './components/FunnelItem01';

function App() {
	const layouterToolsOptions = {
		PUBLIC_API_KEY: 'bjwi19ta',
		/* TODO: come up with a really good name for sectionMap and define it in many places in the code*/
		sectionMap: [
			{
				section: 'landingScreenSection',
				component: LandingScreen,
			},
			{
				section: 'funnelItem01Section',
				component: FunnelItem01,
			},
		],
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
