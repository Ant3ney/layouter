import React, { createContext, useEffect, useState, useRef } from 'react';
import routeStore from './routeStore';
import { sanityStore, queryMainNav, queryCurrentRoute, QueryFormater } from './Sanity';
import { useHasChanged } from './utilities';
export const layouterContext = createContext(null);
export default function LayouterProvider({ children, options }) {
	const { PUBLIC_API_KEY, Loading } = options;
	const [currentRoute, setCurrentRoute] = useState(routeStore.getState().currentLocation);
	const [client, setClient] = useState(sanityStore.getState() ? sanityStore.getState().client : null);
	const [bodyKeys, setBodyKeys] = useState(null);
	const [queriedBodyData, setQueriedBodyData] = useState();
	const [nav, setNav] = useState();
	const [currentSections, setCurrentSections] = useState();
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
		const unsubSanityStore = sanityStore.subscribe(async () => {
			if (sanityStore.getState().client) {
				const navData = await queryMainNav();
				setNav(navData);
			}
		});
		sanityStore.dispatch({ type: 'update client via PUBLIC_API_KEY', PUBLIC_API_KEY });
		return () => {
			unsubSanityStore();
		};
	}, []);

	//Keeps state route up to date with store route
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
			(async () => {
				const queryFormater = new QueryFormater();
				const routeData = (await queryFormater.queryCurrentRoute()).getCurrentRouteData();
				const sectionsData = queryFormater.getCurrentRouteSectionArray();
				setCurrentSections(sectionsData);
				setQueriedBodyData(routeData);
			})();
		}
	}, [hasPathChanged, currentRoute]);

	if (!sanityStore.getState()) {
		if (Loading) return <Loading />;
		else return <div>Loading</div>;
	}

	const value = { client, options, currentSections };

	return <layouterContext.Provider value={value}>{children}</layouterContext.Provider>;
}
