import React, { createContext, useEffect, useState, useRef } from 'react';
import routeStore from './routeStore';
import { sanityStore, queryMainNav, queryCurrentRoute, QueryFormater } from './Sanity';
import { useHasChanged } from './utilities';
export const layouterContext = createContext({});
export default function LayouterProvider({ children, options }) {
	const { PUBLIC_API_KEY, dataset, Loading } = options;
	const [currentRoute, setCurrentRoute] = useState(routeStore.getState().currentLocation);
	const [client, setClient] = useState(sanityStore.getState() ? sanityStore.getState().client : null);
	const [bodyKeys, setBodyKeys] = useState(null);
	const [queriedBodyData, setQueriedBodyData] = useState();
	const [nav, setNav] = useState();
	const [currentSections, setCurrentSections] = useState();
	let hasPathChanged = useHasChanged(currentRoute);

	/* This is a React Hook that subscribes to the `sanityStore` and sets the `client` state to the
	`sanityStore`'s `client` state. */
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
			/* Run inital setters in ths context */
			if (sanityStore.getState().client) {
				const navData = await queryMainNav();
				setNav(navData);
			}
		});
		sanityStore.dispatch({ type: 'update client credentials', credentials: { PUBLIC_API_KEY, dataset } });
		return () => {
			unsubSanityStore();
		};
	}, []);

	//Syncs route state to store
	useEffect(() => {
		const unsubRoute = routeStore.subscribe(() => {
			setCurrentRoute(routeStore.getState().currentLocation);
		});

		return () => {
			unsubRoute();
		};
	}, [currentRoute]);

	/* Route Dependencys syncronization */
	useEffect(() => {
		if (hasPathChanged) {
			(async () => {
				const queryFormater = new QueryFormater();
				const routeData = (await queryFormater.queryCurrentRoute(currentRoute)).getCurrentRouteData();
				const sectionsData = (await queryFormater).getCurrentRouteSectionArray();

				setCurrentSections(sectionsData);
				setQueriedBodyData(routeData);

				console.log('Detected route change.', 'sectionsData:', sectionsData, 'routeData:', routeData);
			})();
		}
	}, [hasPathChanged, currentRoute]);

	//#region Rendoring
	if (!sanityStore.getState()) {
		if (Loading) return <Loading />;
		else return <div>Loading</div>;
	}

	const value = { client, options, currentSections, routeStore };
	return <layouterContext.Provider value={value}>{children}</layouterContext.Provider>;
	//#endregion
}
