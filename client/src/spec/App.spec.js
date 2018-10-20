import App from '../App';
import React from 'react'
import { shallow } from 'enzyme'

describe("App", () => {
  let component;

  beforeEach(() => {
    fetch.mockResponseOnce(JSON.stringify(wineData));
    component = shallow(<App/>);
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it('renders a heading', () => {
    expect(component.find('h1').text()).toBe("Where's My Wine?");
  });

  it('renders a WineList', () => {
    expect(component.find('WineList').length).toBe(1);
  });

  it('renders a WineJail', () => {
    expect(component.find('WineJail').length).toBe(1);
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
    });

    it('renders a WineJail', () => {
      expect(component.find('WineJail').length).toBe(1);
    });

    it('renders a WineList', () => {
      expect(component.find('WineList').length).toBe(1);
    });
  });

  describe("given wines are not in state", () => {
    beforeEach(() => {
      component.setState({ wines: undefined });
    });

    it('does not render a WineJail', () => {
      expect(component.find('WineJail').length).toBe(0);
    });

    it('does not render a WineList', () => {
      expect(component.find('WineList').length).toBe(0);
    });

    it('renders a loading spinner', () => {
      expect(component.find("Loading").length).toBe(1);
    });
  });

  describe("given wines are in state, but the list is empty", () => {
    beforeEach(() => {
      component.setState({ wines: [] });
    });

    it('does not render a WineJail', () => {
      expect(component.find('WineJail').length).toBe(0);
    });

    it('does not render a WineList', () => {
      expect(component.find('WineList').length).toBe(0);
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
