import WineJailSlot from '../WineJailSlot';
import React from 'react'
import { shallow } from 'enzyme'

describe("WineJailSlot", () => {
  let component;
  const wineData = {
    "id":1,
    "position": "1",
    "winemaker": "Cyril Gautheron",
    "vintage": "2012",
    "variety": "Chablis",
    "region": "Burgundy",
  };

  beforeEach(() => {
    component = shallow(<WineJailSlot wine={wineData}/>);
  });

  it('initially has state.popoverOpen set to false', () => {
    expect(component.state("popoverOpen")).toBe(false);
  });

  describe("given a wine", () => {
    beforeEach(() => {
      component = shallow(<WineJailSlot wine={wineData}/>);
    });
  
    it('marks a slot as "full"', () => {
      expect(component.props()['className'].includes("full")).toBe(true);
    });

    it("bases the element's id on the id of the wine", () =>{
      expect(component.props()['id']).toBe(`wine-${wineData.id}`);
    });
  
    it('adds the JSON data of the wine as a data attribute', () => {
      expect(component.props()['data-wine']).toBe(JSON.stringify(wineData));
    });

    it('renders a Popover', () => {
      const popover = component.find("Popover");
      expect(popover.length).toBe(1);
      expect(popover.prop("isOpen")).toBe(false);
      expect(popover.prop("target")).toBe(`wine-${wineData.id}`);
      expect(popover.find("PopoverHeader").prop("children")).toBe("This wine is...");
      expect(popover.find("PopoverBody").prop("children"))
        .toBe(`${wineData.vintage} ${wineData.winemaker} ${wineData.variety} from ${wineData.region}`);
    });

    it('opens the popover when a user hovers over the slot', () => {
      component.simulate("mouseEnter");
      expect(component.state("popoverOpen")).toBe(true);
      expect(component.find("Popover").prop("isOpen")).toBe(true);
    });

    it('closes the popover when a user stops hovering over the slot', () => {
      component.setState({popoverOpen: true});

      component.simulate("mouseLeave");
      expect(component.state("popoverOpen")).toBe(false);
      expect(component.find("Popover").prop("isOpen")).toBe(false);
    });
  });

  describe("given no wine", () => {
    beforeEach(() => {
      component = shallow(<WineJailSlot wine={undefined}/>);
    });
  
    it('marks a slot as "empty"', () => {
      expect(component.props()['className'].includes("empty")).toBe(true);
    });

    it('does not change state.popoverOpen to true when a user hovers over the slot', () => {
      component.simulate("mouseEnter");
      expect(component.state("popoverOpen")).toBe(false);
    });
  });
});
