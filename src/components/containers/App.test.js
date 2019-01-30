import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import reducer from '../../reducers/RootReducer';
import App from './App';
import renderer from 'react-test-renderer';

const middleware = [thunk, promise];
const store = createStore(reducer, compose(applyMiddleware(...middleware)));
const APP = <Provider store={store}><App /></Provider>;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(APP, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(APP)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
