import sanityStore from '../Store';

export const queryMainNav = () => {
	const query = '*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->}, rightNavMenu->{..., navItems[]->}}';
	return standardQueryRunner(query, { noArray: true });
};

export const queryCurrentRoute = currentRoute => {
	if (currentRoute === '/') return queryHomePage();
	const formatedRoute = currentRoute.split('/')[1];

	const query = `*[_type == "page" && slug.current == "${formatedRoute}"] {...}`;
	return standardQueryRunner(query, { noArray: true });
};

export const queryHomePage = currentRoute => {
	const query = '*[_type == "homePage"] {..., homePage->}';
	return standardQueryRunner(query, { noArray: true });
};

function standardQueryRunner(query, settings) {
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
