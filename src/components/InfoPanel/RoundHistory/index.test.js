import React from 'react';
import RoundHistory from './index';
import { shallow } from 'enzyme';

it('render RoundHistory component', () => {
  const c = shallow(<RoundHistory />);
  expect(c).toMatchSnapshot();
});
