import React from 'react';
import renderer from 'react-test-renderer';
import { WikiSection } from '../../../components/simple';

it('renders WikiSection component correctly', () => {
    const tree = renderer
        .create(<WikiSection />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
