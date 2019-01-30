import React from 'react';
import renderer from 'react-test-renderer';
import { MediaCard } from '../../../components/simple';

it('renders MediaCard component correctly', () => {
    const tree = renderer
        .create(<MediaCard />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
