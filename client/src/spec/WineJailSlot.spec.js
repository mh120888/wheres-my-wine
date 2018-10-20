import WineJailSlot from '../WineJailSlot';
import React from 'react'
import { shallow } from 'enzyme'

describe("WineJailSlot", () => {
  let component;

  beforeEach(() => {
    component = shallow(<WineJailSlot wine={wineData}/>);
  });

  it('marks a slot as "full" if passed a wine', () => {
    expect(component.props()['className'].includes("full")).toBe(true);
  });

  it('adds the JSON data of the wine as a data attribute if a wine matches its position', () => {
    const firstSlot = component.find("div[className*='wine-jail-slot']").first();
    expect(component.props()['data-wine']).toBe(JSON.stringify(wineData));
  });

  it('marks a slot as "empty" if not passed a wine', () => {
    const emptySlot = shallow(<WineJailSlot wine={undefined}/>);
    expect(emptySlot.props()['className'].includes("empty")).toBe(true);
  });
});

const wineData = {
  "id":1, "position": "1", "winemaker":"Cyril Gautheron","vintage":"2012","variety":"Chablis","region":"Burgundy","created_at":"2018-10-18T23:13:27.842Z","updated_at":"2018-10-18T23:13:27.842Z"
};
