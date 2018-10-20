import WineJail from '../WineJail';
import React from 'react'
import { shallow } from 'enzyme'

describe("WineJail", () => {
  let component;

  beforeEach(() => {
    fetch.mockResponseOnce(JSON.stringify(wineData))
    component = shallow(<WineJail wines={wineData}/>);
  });

  it('renders a wine jail grid', () => {
    const wineJailContainer = component.find("div[className='wine-jail']");
    expect(wineJailContainer.length).toBe(1);
    expect(wineJailContainer.find("WineJailSlot").length).toBe(96);
    expect(wineJailContainer.find("WineJailSlot").first().prop("wine")).toBe(wineData[0]);
  });
});

const wineData = [
  {"id":1, "position": "1", "winemaker":"Cyril Gautheron","vintage":"2012","variety":"Chablis","region":"Burgundy","created_at":"2018-10-18T23:13:27.842Z","updated_at":"2018-10-18T23:13:27.842Z"},
  {"id":2, "position": "2", "winemaker":"Cinco Manos","vintage":"2016","variety":"Chardonnay","region":"Chile","created_at":"2018-10-18T23:13:27.848Z","updated_at":"2018-10-18T23:13:27.848Z"},
  {"id":3, "position": "3", "winemaker":"Cinco Manos","vintage":"2016","variety":"Chardonnay","region":"Chile","created_at":"2018-10-18T23:13:27.853Z","updated_at":"2018-10-18T23:13:27.853Z"},
  {"id":4, "position": "4", "winemaker":"La Fleur d'Or","vintage":"2013","variety":"Sauternes","region":"Bordeaux","created_at":"2018-10-18T23:13:27.859Z","updated_at":"2018-10-18T23:13:27.859Z"},
  {"id":5, "position": "5", "winemaker":"Lucas \u0026 Lewellen","vintage":"2017","variety":"Rose","region":"Santa Barbara","created_at":"2018-10-18T23:13:27.864Z","updated_at":"2018-10-18T23:13:27.864Z"}
];
