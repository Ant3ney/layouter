const sanityClient = require('@sanity/client');

function CreateSanityClient(credentials) {
	let { PUBLIC_API_KEY, dataset } = credentials;
	if (!PUBLIC_API_KEY) console.error('PUBLIC_API_KEY must be defined when creating a sanity client');
	dataset = dataset || 'production';
	return sanityClient({
		projectId: PUBLIC_API_KEY,
		dataset,
		apiVersion: '2021-03-25',
		useCdn: true,
	});
}

export default CreateSanityClient;
