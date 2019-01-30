import React from 'react';
import renderer from 'react-test-renderer';
import { EmptyPage } from '../../../components/simple';

it('renders EmptyPage component correctly', () => {
	const tree = renderer
		.create(<EmptyPage />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
