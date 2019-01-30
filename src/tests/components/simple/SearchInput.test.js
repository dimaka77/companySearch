import React from 'react';
import renderer from 'react-test-renderer';
import { SearchInput } from '../../../components/simple';

it('renders SearchInput component correctly', () => {
    const tree = renderer
        .create(<SearchInput />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
