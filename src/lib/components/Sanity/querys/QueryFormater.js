import queryCurrentRoute from './queryCurrentRoute';

export default class QueryFormater {
	constructor(query) {
		this.query = query;
	}
	//TODO: Create a run query function in class.
	/**
	 * It queries the current route data.
	 * @returns queryFormater.
	 */
	async queryCurrentRoute() {
		const currentRouteData = await queryCurrentRoute();
		this.currentRouteData = currentRouteData;

		return this;
	}

	/**
	 * Get the current route data
	 * @returns The current route data.
	 */
	getCurrentRouteData() {
		return this.currentRouteData;
	}

	/**
	 * Get the current route section array keys
	 * @returns An array of the keys of the sections in the current route.
	 */
	getCurrentRouteSectionArray() {
		const currentRouteData = this.currentRouteData;
		if (!currentRouteData || !currentRouteData.sections)
			return (() => {
				console.error(
					'In order to call get section array keys, you must make sure this.currentRouteData and this.currentRouteData.sections is defined'
				);
				return 'Error';
			})();

		return this.currentRouteData.sections;
	}
}
