import standardQueryRunner from './standardQueryRunner';

export default function queryHomePage(currentRoute) {
	const query = '*[_type == "homePage"] {..., homePage-> {..., sections[]->}}';
	return standardQueryRunner(query, { noArray: true });
}
