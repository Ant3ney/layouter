import sanityStore from './Store';

export default function queryRoute(currentRoute) {
	const client = sanityStore.getState().client;
	const query = '*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->}, rightNavMenu->{..., navItems[]->}}';

	client.fetch(query).then(mainNavs => {
		mainNavs.forEach(mainNav => {
			console.log(mainNav);
		});
	});
	return client;
}
