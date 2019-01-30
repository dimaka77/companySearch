import React from 'react';
import renderer from 'react-test-renderer';
import { GithubRepoItem } from '../../../components/simple';

it('renders GithubRepoItem component correctly', () => {
    const tree = renderer
        .create(<GithubRepoItem />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
