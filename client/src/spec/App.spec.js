import App from '../App';
import React from 'react'
import { shallow } from 'enzyme'

describe("App", () => {
  let component;

  beforeEach(() => {
    component = shallow(<App/>);
  });

  it('renders a heading', () => {
    expect(component.find('h1').text()).toBe("Where's My Wine?");
  });

  it('renders a WineList', () => {
    expect(component.find('WineList').length).toBe(1);
  });
});
