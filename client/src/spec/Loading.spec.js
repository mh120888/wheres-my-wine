import Loading from '../Loading';
import React from 'react'
import { shallow } from 'enzyme'

describe("Loading", () => {
  let component;

  beforeEach(() => {
    component = shallow(<Loading/>);
  });

  it("renders a div with the correct class", () => {
    expect(component.find("div[className='loading-circle']").length).toBe(1);
  });
});
