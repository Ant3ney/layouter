import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, Body } from './lib';
import LandingScreen from './components/LandingScreen';
import FunnelItem01 from './components/FunnelItem01';
import InnerComp from './InnerComp';

function App() {
	const layouterToolsOptions = {
		PUBLIC_API_KEY: 'bjwi19ta',
		dataset: 'development',
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
			{
				section: 'shopDisplaySection',
				component: () => {
					return <div>This is the shop section</div>;
				},
			},
		],
	};
	return (
		<div className='App'>
			<Provider options={layouterToolsOptions}>
				<Body />
				<InnerComp />
			</Provider>
		</div>
	);
}

export default App;
