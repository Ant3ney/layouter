import sanityStore from '../Store';

export const queryMainNav = currentRoute => {
	const client = sanityStore.getState().client;
	const query = '*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->}, rightNavMenu->{..., navItems[]->}}';

	if (client)
		client.fetch(query).then(mainNavs => {
			mainNavs.forEach(mainNav => {
				console.log(mainNav);
			});
		});
	return client;
};

export const queryCurrentRoute = currentRoute => {
	const client = sanityStore.getState().client;
	const query = '*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->}, rightNavMenu->{..., navItems[]->}}';

	if (client)
		client.fetch(query).then(mainNavs => {
			mainNavs.forEach(mainNav => {
				console.log(mainNav);
			});
		});
	return client;
};
