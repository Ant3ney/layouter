import { createStore } from 'redux';
import CreateSanityClient from './createSanityClient';

function reducer(state: any = {}, newState: any) {
	switch (newState.type) {
		case 'update client':
			state.client = newState.client;
			break;
		case 'update client via PUBLIC_API_KEY':
			state.client = CreateSanityClient(newState.PUBLIC_API_KEY);
			break;
		default:
			console.log(`No action defined for type: ${newState.type}`);
	}

	return state;
}

export default createStore(reducer);
