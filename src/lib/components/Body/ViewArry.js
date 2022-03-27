import React, { useContext } from 'react';
import { layouterContext } from '../Provider';
export default function View() {
	const { client, currentSections, options } = useContext(layouterContext);
	console.log(currentSections, options);
	if (!currentSections || !options || !options.sectionMap) {
		return <div>Loading</div>;
	}
	return (
		<div>
			{currentSections.map((currentSection, i) => {
				const currentComponentSectionMapData = options.sectionMap.find(section => {
					return currentSection._type === section.section;
				});
				if (!currentComponentSectionMapData) return <div>No Components found for this route</div>;

				const CurrentComponent = currentComponentSectionMapData.component;

				const props = currentSection;

				return <CurrentComponent {...props} key={i} />;
			})}
			This is the layouter body
		</div>
	);
}
