import { createStore } from 'redux';

function routeStoreReducer(state = { currentLocation: window.location.pathname }, newState: any) {
	switch (newState.type) {
		case 'updateCurrentLocation':
			//TODO: Fix this function so that the back button actualy works
			window.history.pushState({}, 'Site navigation', newState.currentLocation);
			state.currentLocation = newState.currentLocation;
			break;
		default:
			break;
	}

	return state;
}

export default createStore(routeStoreReducer);
