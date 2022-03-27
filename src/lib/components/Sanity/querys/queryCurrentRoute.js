import standardQueryRunner from './standardQueryRunner';
import queryHomePage from './queryHomePage';

export default async function (currentRoute) {
	currentRoute = currentRoute || window.location.pathname;
	if (currentRoute === '/') {
		return (await queryHomePage()).homePage;
	}
	const formatedRoute = currentRoute.split('/')[1];

	const query = `*[_type == "page" && slug.current == "${formatedRoute}"] {..., sections[]->}`;
	return standardQueryRunner(query, { noArray: true });
}
