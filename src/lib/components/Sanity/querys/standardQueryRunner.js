import sanityStore from '../Store';

export default function standardQueryRunner(query, settings) {
	const client = sanityStore.getState().client;
	return new Promise((res, rej) => {
		if (client)
			client
				.fetch(query)
				.then(response => {
					if (settings.noArray) res(response[0]);
					else res(response);
				})
				.catch(err => {
					rej(err);
				});
		else rej({ message: 'Sanity client was not defined in query funtion' });
	});
}
