import React from 'react';
import renderer from 'react-test-renderer';
import { GithubSection } from '../../../components/simple';

it('renders GithubSection component correctly', () => {
    const tree = renderer
        .create(<GithubSection />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
