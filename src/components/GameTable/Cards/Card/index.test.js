import React from 'react';
import Card from './index';
import { shallow } from 'enzyme';

it('render Card component', () => {
  const c = shallow(<Card />);
  expect(c).toMatchSnapshot();
});
