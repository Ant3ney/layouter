import React, { createContext, useEffect, useState } from 'react';
import routeStore from './routeStore';
import { sanityStore } from './Sanity';

type options = {
	PUBLIC_API_KEY: string;
};

type layouterContextComponent = {
	children: any;
	options: options;
};
type layouterContextValue = {
	client: any;
	options: options;
};

export const layouterContext = createContext<any>({ client: null, options: null });
export default function LayouterProvider({ children, options }: layouterContextComponent) {
	const { PUBLIC_API_KEY } = options;
	const [currentRoute, setCurrentRoute] = useState(routeStore.getState().currentLocation);
	const [client, setClient] = useState(sanityStore.getState().client);
	useEffect(() => {
		const unsubClient = sanityStore.subscribe(() => {
			setClient(sanityStore.getState().client);
		});
		return () => {
			unsubClient();
		};
	}, [client]);
	useEffect(() => {
		sanityStore.dispatch({ type: 'update client via PUBLIC_API_KEY', PUBLIC_API_KEY });
	}, []);
	useEffect(() => {
		const unsubRoute = routeStore.subscribe(() => {
			setCurrentRoute(routeStore.getState().currentLocation);
		});
		return () => {
			unsubRoute();
		};
	}, [currentRoute]);

	if (!sanityStore.getState()) {
		return <div>Loading</div>;
	}

	const value: layouterContextValue = { client, options };

	return <layouterContext.Provider value={value}>{children}</layouterContext.Provider>;
}
