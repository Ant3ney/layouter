import standardQueryRunner from './standardQueryRunner';

export default function queryMainNav() {
	const query = '*[_type == "mainNav"] {..., leftNavMenu->{..., navItems[]->}, rightNavMenu->{..., navItems[]->}}';
	return standardQueryRunner(query, { noArray: true });
}
