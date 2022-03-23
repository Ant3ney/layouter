import React, { createContext, useEffect, useState, useRef } from 'react';
import routeStore from './routeStore';
import { sanityStore } from './Sanity';
import { queryMainNav, queryCurrentRoute } from './Sanity/querys';
import { useHasChanged } from './utilities';
export const layouterContext = createContext(null);
export default function LayouterProvider({ children, options }) {
	const { PUBLIC_API_KEY } = options;
	const [currentRoute, setCurrentRoute] = useState(routeStore.getState().currentLocation);
	const [client, setClient] = useState(sanityStore.getState() ? sanityStore.getState().client : null);
	const [bodyKeys, setBodyKeys] = useState(null);
	const [queriedBodyData, setQueriedBodyData] = useState();
	const [publicAPIKey, setPublicAPIKey] = useState(PUBLIC_API_KEY);
	let hasPathChanged = useHasChanged(currentRoute);

	useEffect(() => {
		const unsubClient = sanityStore.subscribe(() => {
			setClient(sanityStore.getState().client);
		});
		return () => {
			unsubClient();
		};
	}, [client]);
	useEffect(() => {
		const unsubSanityStore = sanityStore.subscribe(() => {
			if (sanityStore.getState().client) {
				queryMainNav();
			}
		});
		sanityStore.dispatch({ type: 'update client via PUBLIC_API_KEY', PUBLIC_API_KEY });
		return () => {
			unsubSanityStore();
		};
	}, []);
	useEffect(() => {
		const unsubRoute = routeStore.subscribe(() => {
			setCurrentRoute(routeStore.getState().currentLocation);
		});

		return () => {
			unsubRoute();
		};
	}, [currentRoute]);

	useEffect(() => {
		if (hasPathChanged) {
			queryCurrentRoute(currentRoute);
			setQueriedBodyData();
			console.log('Route change detected');
		}
	}, [hasPathChanged, currentRoute]);

	if (!sanityStore.getState()) {
		return <div>Loading</div>;
	}

	const value = { client, options };

	return <layouterContext.Provider value={value}>{children}</layouterContext.Provider>;
}
