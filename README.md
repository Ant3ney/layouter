# Layouter

A package designed to save time in connecting your CMS app layouts to your arrangements of react components.

## Install

```bash
npm -i --save layouter-tools
```

## Usage

### Import nessisary dependencies

```javascript
import { Provider, Body } from 'layouter-tools';
```

### Define the layouterToolsOptions variable

```javascript
function App() {
	const layouterToolsOptions = {
		PUBLIC_API_KEY: 'bjwi19ta',
		sectionMap: [
			{
				section: 'landingScreenSection',
				component: () => {
					return <div>This is the Landing section</div>;
				},
			},
			{
				section: 'funnelItem01Section',
				component: () => {
					return <div>This is the Funnel section</div>;
				},
			},
			{
				section: 'shopDisplaySection',
				component: () => {
					return <div>This is the shop section</div>;
				},
			},
	};
}

export default App;
```

### Use layouterToolsOptions as a prop for the Provider component

```javascript
function App() {
	return (
		<div className='App'>
			<Provider options={layouterToolsOptions}>
				<Body />
			</Provider>
		</div>
	);
}

export default App;
```

### Entire Usage example

```javascript
//App.js of Create React app
import logo from './logo.svg';
import './App.css';
import { Provider, Body } from 'layouter-tools';

function App() {
	const layouterToolsOptions = {
		PUBLIC_API_KEY: '******',
		sectionMap: [
			{
				section: 'landingScreenSection',
				component: () => {
					return <div>This is the Landing section</div>;
				},
			},
			{
				section: 'funnelItem01Section',
				component: () => {
					return <div>This is the Funnel section</div>;
				},
			},
			{
				section: 'shopDisplaySection',
				component: () => {
					return <div>This is the shop section</div>;
				},
			},
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
```
