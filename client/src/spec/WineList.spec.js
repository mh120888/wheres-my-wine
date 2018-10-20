import WineList from '../WineList';
import React from 'react'
import { shallow } from 'enzyme'

describe("WineList", () => {
  let component;
  const getAllWines = jest.fn();

  beforeEach(() => {
    fetch.once(JSON.stringify({}));;
    component = shallow(<WineList wines={wineData} getAllWines={getAllWines}/>);
  });

  describe("given wines are in state", () => {
    let list;

    beforeEach(() => {
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
          fetch.once(JSON.stringify({}));
          global.confirm = jest.fn(() => true);

          const fakeEvent = { currentTarget: { dataset: { wine: 1 } } }
          list.find("li").first().find("button").simulate("click", fakeEvent);
        });

        afterEach(() => {
          fetch.resetMocks();
        });

        it("deletes the wine", () => {
          const deleteFetchCall = fetch.mock.calls[0];
          const fetchUrl = new URL(deleteFetchCall[0]);
          expect(fetchUrl.pathname).toBe("/wines/1");
          expect(deleteFetchCall[1].method).toBe("DELETE");
        });

        it("fetches the updated list of wine", () => {
          expect(getAllWines).toHaveBeenCalled();
        });
      });
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
