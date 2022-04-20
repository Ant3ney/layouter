import { createStore } from 'redux';
import CreateSanityClient from './createSanityClient';

function reducer(state = {}, newState) {
	switch (newState.type) {
		case 'update client':
			state.client = newState.client;
			break;
		case 'update client via PUBLIC_API_KEY':
			state.client = CreateSanityClient({ PUBLIC_API_KEY: newState.PUBLIC_API_KEY });
			break;
		case 'update client credentials':
			state.client = CreateSanityClient(newState.credentials);
		default:
			console.log(`No action defined for type: ${newState.type}`);
	}

	return state;
}

export default createStore(reducer);
