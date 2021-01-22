import React from 'react';
import GameTitle from './index';
import { shallow } from 'enzyme';

it('render GameTitle component', () => {
  const c = shallow(<GameTitle />);
  expect(c).toMatchSnapshot();
});
