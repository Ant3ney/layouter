import React, { createContext, useEffect, useState, useRef } from 'react';
import routeStore from './routeStore';
import { sanityStore } from './Sanity';
import queryRoute from './Sanity/queryRoute';
import URL_to_map_keys from './Sanity/URL_to_map_keys';

export const layouterContext = createContext(null);
export default function LayouterProvider({ children, options }) {
	const { PUBLIC_API_KEY } = options;
	const [currentRoute, setCurrentRoute] = useState(routeStore.getState().currentLocation);
	const [client, setClient] = useState(sanityStore.getState() ? sanityStore.getState().client : null);
	const [bodyKeys, setBodyKeys] = useState(null);
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

	useEffect(() => {
		if (hasPathChanged) {
			console.log('Route change detected');
			console.log(queryRoute(currentRoute));
		}
	}, [hasPathChanged, currentRoute]);

	if (!sanityStore.getState()) {
		return <div>Loading</div>;
	}

	const value = { client, options };

	function useHasChanged(val) {
		const prevVal = usePrevious(val);
		return prevVal !== val;
	}
	function usePrevious(value) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}

	return <layouterContext.Provider value={value}>{children}</layouterContext.Provider>;
}
