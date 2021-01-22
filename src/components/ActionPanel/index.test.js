import React from 'react';
import ActionPanel from './index';
import { shallow } from 'enzyme';

it('render ActionPanel component', () => {
  const c = shallow(<ActionPanel />);
  expect(c).toMatchSnapshot();
});
