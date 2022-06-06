import standardQueryRunner from './standardQueryRunner';

export default function queryMainNav() {
	const query =
		'*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->{..., navContent->, subNavItems[]->{..., navContent->}}}, rightNavMenu->{..., navItems[]->{..., navContent->, subNavItems[]->{..., navContent->}}}, home->}';
	return standardQueryRunner(query, { noArray: true });
}
