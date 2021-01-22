import React from 'react';
import Loader from './index';
import { shallow } from 'enzyme';

it('render Loader component', () => {
  const c = shallow(<Loader />);
  expect(c).toMatchSnapshot();
});
