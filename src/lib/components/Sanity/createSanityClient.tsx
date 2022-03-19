const sanityClient = require('@sanity/client');

function CreateSanityClient(PUBLIC_API_KEY: string) {
	return sanityClient({
		projectId: PUBLIC_API_KEY,
		dataset: 'production',
		apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
		useCdn: true, // `false` if you want to ensure fresh data
	});
}

export default CreateSanityClient;
