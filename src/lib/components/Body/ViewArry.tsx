import React, { useContext } from 'react';
import { layouterContext } from '../Provider';
export default function View() {
	const { client } = useContext(layouterContext);
	console.log(client);
	return <div>This is the layouter body</div>;
}
