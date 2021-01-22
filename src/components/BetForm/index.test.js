import React from 'react';
import BetForm from './index';
import { shallow } from 'enzyme';

it('render BetForm component', () => {
  const c = shallow(<BetForm />);
  expect(c).toMatchSnapshot();
});
