import React from 'react';
import Cards from './index';
import { shallow } from 'enzyme';

it('render Cards component', () => {
  const c = shallow(<Cards />);
  expect(c).toMatchSnapshot();
});
