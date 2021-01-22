import React from 'react';
import NumberOfRound from './index';
import { shallow } from 'enzyme';

it('render NumberOfRound component', () => {
  const c = shallow(<NumberOfRound />);
  expect(c).toMatchSnapshot();
});
