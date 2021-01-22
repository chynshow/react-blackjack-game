import React from 'react';
import PlayerCredit from './index';
import { shallow } from 'enzyme';

it('render PlayerCredit component', () => {
  const c = shallow(<PlayerCredit />);
  expect(c).toMatchSnapshot();
});
