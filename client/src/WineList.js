import React, { Component } from 'react';

class WineList extends Component {
  constructor() {
    super();

    this.displayWines = this.displayWines.bind(this);
    this.removeWine = this.removeWine.bind(this);
  }

  render() {
    return (
      <div className="wine-list">
        {this.displayWines()}
      </div>
    );
  }

  displayWines() {
    const children = [];
    this.props.wines.forEach((wine) => children.push(this.getWine(wine)));
    return <ul className="wine-list list-group">{children}</ul>;
  }

  getWine(wine) {
    return <li className="list-group-item" key={wine.id}>
      <span className="text">{wine.vintage} {wine.winemaker} {wine.variety}</span>
      <button className="btn btn-sm btn-danger align-right" onClick={this.removeWine} data-wine={wine.id}>Remove wine</button>
    </li>;
  }

  removeWine(e) {
    const shouldDelete = global.confirm("Are you sure you want to remove this wine?");
    if (shouldDelete) {
      fetch(`http://localhost:3001/wines/${e.currentTarget.dataset.wine}`, { method: "DELETE" })
        .then(response => this.props.getAllWines());
    } else {
    }
  }
}

export default WineList;
