import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducer from '../../../reducers/RootReducer';
import App from '../../../components/containers/App';
import renderer from 'react-test-renderer';

const middleware = [thunk, promise];
const store = createStore(reducer, compose(applyMiddleware(...middleware)));
const APP = <Provider store={store}><App /></Provider>;

it('renders App component correctly', () => {
  const tree = renderer
    .create(APP)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
