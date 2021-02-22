import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

test('snapshot', () => {
  expect(renderer.create(<App className="App"/>).toJSON()).toMatchSnapshot()
});
