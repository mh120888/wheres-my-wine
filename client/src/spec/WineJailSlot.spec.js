import WineJailSlot from '../WineJailSlot';
import React from 'react'
import { shallow } from 'enzyme'

describe("WineJailSlot", () => {
  let component;
  let wineData;
  let updateWines;

  beforeEach(() => {
    wineData = {
      "id": 17,
      "position": "1",
      "winemaker": "Cyril Gautheron",
      "vintage": "2012",
      "variety": "Chablis",
      "region": "Burgundy",
    };
    updateWines = jest.fn();
    component = shallow(<WineJailSlot wine={wineData} updateWines={updateWines}/>);
  });

  it('initially has state.popoverOpen set to false', () => {
    expect(component.state("popoverOpen")).toBe(false);
  });

  it('renders a modal, initially hidden', () => {
    const modal = component.find("Modal");
    expect(modal.length).toBe(1);
    expect(modal.props().isOpen).toBe(false);
    expect(modal.find("ModalHeader").length).toBe(1);
    expect(modal.find("ModalBody").length).toBe(1);
    expect(modal.find("ModalFooter").length).toBe(1);
  });

  it('shows a modal and hides a Popover when clicked', () => {
    component.simulate("mouseEnter");
    component.simulate("click");

    expect(component.find("Modal").props().isOpen).toBe(true);
    expect(component.find("Popover").props().isOpen).toBe(false);
  });

  describe("modal buttons", () => {
    it("clicking on the 'Close Window' button closes the modal", () => {
      component.simulate("click");

      component.find("Modal").find("Button[name='close-window']").simulate("click");

      expect(component.find("Modal").props().isOpen).toBe(false);
    });
  });

  describe("given a wine", () => {
    beforeEach(() => {
      component = shallow(<WineJailSlot wine={wineData} updateWines={updateWines}/>);
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

    describe("modal", () => {
      describe("'Remove Wine' button", () => {
        let button;

        beforeEach(() => {
          button = component.find("Modal").find("Button[name='remove-wine']");
        });

        it("is rendered", () => {
          expect(button.length).toBe(1);
          expect(button.prop("color")).toBe("danger");
          expect(button.children().text()).toBe("Remove Wine");
        });

        describe("clicking it", () => {
          let spy;

          beforeEach(() => {
            spy = jest.spyOn(window, 'confirm');
            button.simulate("click");
          });

          it("prompts the user to confirm the action", () => {
            expect(spy).toHaveBeenCalledWith("Are you sure you want to remove this wine?");
          });

          describe("confirming the action", () => {
            beforeEach(() => {
              global.confirm = jest.fn(() => true);
              button.simulate("click");
            });

            it("removes the wine", () => {
              global.confirm = jest.fn(() => true);
  
              const deleteFetchCall = fetch.mock.calls[0];
              const fetchUrl = new URL(deleteFetchCall[0]);
  
              expect(fetchUrl.pathname).toBe(`/wines/${wineData["id"]}`);
              expect(deleteFetchCall[1].method).toBe("DELETE");
            });
    
            it("fetches the updated list of wine", () => {
              global.confirm = jest.fn(() => true);
              expect(updateWines).toHaveBeenCalled();
            });
          });
        });
      });
    });
  });

  describe("given no wine", () => {
    beforeEach(() => {
      component = shallow(<WineJailSlot wine={undefined} updateWines={updateWines}/>);
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
