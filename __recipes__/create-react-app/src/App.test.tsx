import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import { classNamesCheck } from 'react-classnaming';

test('snapshot', () => {
  expect(renderer.create(<App classnames={classNamesCheck<typeof App>({
    "App": undefined,
    "App_header": "App-header",
    "App-logo": undefined,
    "App-link": undefined
  })}/>).toJSON()).toMatchSnapshot()
});
