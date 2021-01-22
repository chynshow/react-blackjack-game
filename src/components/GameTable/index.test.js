import React from 'react';
import GameTable from './index';
import { shallow } from 'enzyme';

it('render GameTable component', () => {
  const c = shallow(<GameTable />);
  expect(c).toMatchSnapshot();
});
