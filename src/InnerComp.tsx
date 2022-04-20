import React, { useContext } from 'react';
import { layouterContext } from './lib';
export default function InnerComp() {
	const { routeStore } = useContext<any>(layouterContext);
	return (
		<div>
			<h1>This is the real comp</h1>
			<button
				onClick={() => {
					routeStore.dispatch({
						type: 'currentLocation',
						currentLocation: 'thecoolpage',
					});
				}}
			>
				Test Dispatch
			</button>
		</div>
	);
}
