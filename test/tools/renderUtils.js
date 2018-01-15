import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });
import React from 'react';
import { Provider } from 'react-redux';
const { shallow, mount } = Enzyme;

import configureStore from '../../app/configureStore';

export function renderConnected (component, state) {
  const store = configureStore(state);
  return mount(
    <Provider store={store}>
      {component}
    </Provider>
  );
}

export function render (component) {
  return shallow(component);
}
