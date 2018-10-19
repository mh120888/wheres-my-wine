import React, { Component } from 'react';
import Loading from './Loading';

class WineList extends Component {
  constructor() {
    super();

    this.getAllWines = this.getAllWines.bind(this);
    this.displayWines = this.displayWines.bind(this);
    this.removeWine = this.removeWine.bind(this);
    this.state = {};
  }

  render() {
    return (
      <div className="wine-list">
        {this.displayWines()}
      </div>
    );
  }

  componentWillMount() {
    this.getAllWines();
  }

  getAllWines() {
    fetch("http://localhost:3001/wines/")
      .then(response => response.json())
      .then(json => this.setState({ wines: json }));
  }

  displayWines() {
    if (!this.state.wines) {
      return <Loading/>;
    } else if (this.state.wines.length > 0) {
      const children = [];
      this.state.wines.forEach((wine) => children.push(this.getWine(wine)));
      return <ul className="wine-list list-group">{children}</ul>;
    } else {
      return <p>{noWinesMessage}</p>;
    }
  }

  getWine(wine, index) {
    return <li className="list-group-item" key={wine.id}>
      <span className="text">{wine.vintage} {wine.winemaker} {wine.variety}</span>
      <button className="btn btn-sm btn-danger align-right" onClick={this.removeWine} data-wine={wine.id}>Remove wine</button>
    </li>;
  }

  removeWine(e) {
    const shouldDelete = global.confirm("Are you sure you want to remove this wine?");
    if (shouldDelete) {
      fetch(`http://localhost:3001/wines/${e.currentTarget.dataset.wine}`, { method: "DELETE" })
        .then(response => this.getAllWines());
    } else {
    }
  }
}

const noWinesMessage = "You have no wine";

export default WineList;
