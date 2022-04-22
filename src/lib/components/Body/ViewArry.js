import React, { useContext } from 'react';
import { layouterContext } from '../Provider';
export default function View() {
	const { client, currentSections, options } = useContext(layouterContext);
	if (!currentSections || !options || !options.sectionMap) {
		return <div>Loading</div>;
	}
	return (
		<div className='layouter-body-continer'>
			{currentSections.map((currentSection, i) => {
				const currentComponentSectionMapData = options.sectionMap.find(section => {
					return currentSection._type === section.section;
				});
				if (!currentComponentSectionMapData)
					return <div>No Component found section of type {currentSection._type}</div>;

				const CurrentComponent = currentComponentSectionMapData.component;

				const props = currentSection;

				return <CurrentComponent {...props} firstComp={i === 0} key={i} />;
			})}
		</div>
	);
}
