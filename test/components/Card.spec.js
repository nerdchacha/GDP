import { expect } from 'chai';
import React from 'react'
import { render } from '../tools/renderUtils'
import Card from '../../app/components/Card';

describe('Card component', function () {
  it('Should have card class', function () {
    const wrapper = render(<Card heading="dummy" />);
    expect(wrapper.hasClass('card')).to.be.true;
  });

  it('Should have add class if it is passed as prop', function () {
    const wrapper = render(<Card heading="dummy" className="foo"/>);
    expect(wrapper.hasClass('foo')).to.be.true;
  });
})
