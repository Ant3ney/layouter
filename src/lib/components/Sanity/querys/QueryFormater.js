import queryCurrentRoute from './queryCurrentRoute';

export default class QueryFormater {
	constructor() {}
	async queryCurrentRoute() {
		const currentRouteData = await queryCurrentRoute();
		this.currentRouteData = currentRouteData;
		console.log(currentRouteData);
		return this;
	}
	getCurrentRouteData() {
		return this.currentRouteData;
	}
	getCurrentRouteSectionArray() {
		if (!this.currentRouteData || !this.currentRouteData.sections)
			return (() => {
				console.error(
					'In order to call get section array keys, you must make sure this.currentRouteData and this.currentRouteData.sections is defined'
				);
				return 'Error';
			})();

		const currentRouteData = this.currentRouteData;
		return this.currentRouteData.sections;
	}
}
