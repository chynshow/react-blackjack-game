import React from 'react';
import PlayerBet from './index';
import { shallow } from 'enzyme';

it('render PlayerBet component', () => {
  const c = shallow(<PlayerBet />);
  expect(c).toMatchSnapshot();
});
