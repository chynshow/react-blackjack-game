import React from 'react';
import InfoPanel from './index';
import { shallow } from 'enzyme';

it('render InfoPanel component', () => {
  const c = shallow(<InfoPanel />);
  expect(c).toMatchSnapshot();
});
