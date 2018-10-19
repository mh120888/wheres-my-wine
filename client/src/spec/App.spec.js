import App from '../App';
import React from 'react'
import { shallow } from 'enzyme'

describe("App", () => {
  let component;

  beforeEach(() => {
    fetch.mockResponseOnce(JSON.stringify(wineData))
    component = shallow(<App/>);
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('renders a heading', () => {
    expect(component.find('h1').text()).toBe("Where's My Wine?");
  });

  it('fetches a list of wines', () => {
    expect(fetch.mock.calls.length).toEqual(1);
    const fetchUrl = new URL(fetch.mock.calls[0][0]);
    expect(fetchUrl.pathname).toBe("/wines/");
  });

  describe("given wines are in state", () => {
    let list;

    beforeEach(() => {
      component.setState({wines: wineData});
      list = component.find('ul');
    });

    it('renders a list of wines', () => {
      expect(list.length).toBe(1);

      const expectedText = `${wineData[0].vintage} ${wineData[0].winemaker} ${wineData[0].variety}`;
      expect(list.find("li").first().find("span").text()).toBe(expectedText);
    });

    it('renders a delete button for each wine', () => {
      expect(list.find("li").first().find("button").text()).toBe("Remove wine");
    });

    describe("choosing to remove a wine", () => {
      it("prompts the user to confirm their decision", () => {
        const spy = jest.spyOn(window, 'confirm');
        list.find("li").first().find("button").simulate("click");
        expect(spy).toHaveBeenCalledWith("Are you sure you want to remove this wine?");
      });

      describe("given the user confirms their choice", () => {
        beforeEach(() => {
          fetch
            .once(JSON.stringify(wineData))
            .once(JSON.stringify({}))
          global.confirm = jest.fn(() => true);

          const fakeEvent = { currentTarget: { dataset: { wine: 1 } } }
          list.find("li").first().find("button").simulate("click", fakeEvent);
        });

        afterEach(() => {
          fetch.resetMocks();
        });

        it("deletes the wine", () => {
          const deleteFetchCall = fetch.mock.calls[1];
          const fetchUrl = new URL(deleteFetchCall[0]);
          expect(fetchUrl.pathname).toBe("/wines/1");
          expect(deleteFetchCall[1].method).toBe("DELETE");
        });

        it("fetches the updated list of wine", () => {
          const fetchUrl = new URL(fetch.mock.calls[2][0]);
          expect(fetchUrl.pathname).toBe("/wines/");
        });
      });
    });
  });

  describe("given wines are not in state", () => {
    beforeEach(() => {
      component.setState({ wines: undefined });
    });

    it('does not render a list of wines', () => {
      const list = component.find('ul');
      expect(list.length).toBe(0);
    });

    it('renders a loading spinner', () => {
      expect(component.find("Loading").length).toBe(1);
    });
  });

  describe("given wines are in state, but the list is empty", () => {
    beforeEach(() => {
      component.setState({ wines: [] });
    });

    it('does not render a list of wines', () => {
      const list = component.find('ul');
      expect(list.length).toBe(0);
    });

    it('renders a message stating there are no wines', () => {
      expect(component.find("p").text()).toBe("You have no wine");
    });
  });
});

const wineData = [
  {"id":1,"winemaker":"Cyril Gautheron","vintage":"2012","variety":"Chablis","region":"Burgundy","created_at":"2018-10-18T23:13:27.842Z","updated_at":"2018-10-18T23:13:27.842Z"},
  {"id":2,"winemaker":"Cinco Manos","vintage":"2016","variety":"Chardonnay","region":"Chile","created_at":"2018-10-18T23:13:27.848Z","updated_at":"2018-10-18T23:13:27.848Z"},
  {"id":3,"winemaker":"Cinco Manos","vintage":"2016","variety":"Chardonnay","region":"Chile","created_at":"2018-10-18T23:13:27.853Z","updated_at":"2018-10-18T23:13:27.853Z"},
  {"id":4,"winemaker":"La Fleur d'Or","vintage":"2013","variety":"Sauternes","region":"Bordeaux","created_at":"2018-10-18T23:13:27.859Z","updated_at":"2018-10-18T23:13:27.859Z"},
  {"id":5,"winemaker":"Lucas \u0026 Lewellen","vintage":"2017","variety":"Rose","region":"Santa Barbara","created_at":"2018-10-18T23:13:27.864Z","updated_at":"2018-10-18T23:13:27.864Z"}
];
