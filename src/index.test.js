import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

it('render App component', () => {
  const c = shallow(<App />);
  expect(c).toMatchSnapshot();
});
