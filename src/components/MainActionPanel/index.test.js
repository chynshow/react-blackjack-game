import React from 'react';
import MainActionPanel from './index';
import { shallow } from 'enzyme';

it('render MainActionPanel component', () => {
  const c = shallow(<MainActionPanel />);
  expect(c).toMatchSnapshot();
});
