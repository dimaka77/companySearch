import React from 'react';
import renderer from 'react-test-renderer';
import { ImageEmptyState } from '../../../components/simple';

it('renders ImageEmptyState component correctly', () => {
	const tree = renderer
		.create(<ImageEmptyState />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
