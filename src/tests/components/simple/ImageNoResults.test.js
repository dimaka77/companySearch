import React from 'react';
import renderer from 'react-test-renderer';
import { ImageNoResults } from '../../../components/simple';

it('renders ImageNoResults component correctly', () => {
	const tree = renderer
		.create(<ImageNoResults />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
