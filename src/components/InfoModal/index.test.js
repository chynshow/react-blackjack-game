import React from 'react';
import InfoModal from './index';
import { shallow } from 'enzyme';

it('render InfoModal component', () => {
  const c = shallow(<InfoModal />);
  expect(c).toMatchSnapshot();
});
