import React, { Component } from 'react';
import Loading from './Loading';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.displayWines = this.displayWines.bind(this);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <h1 className="display-1 text-center">Where's My Wine?</h1>
        {this.displayWines()}
      </div>
    );
  }

  componentWillMount() {
    fetch("http://localhost:3001/wines/")
      .then(response => response.json())
      .then(json => this.setState({ wines: json }));
  }

  displayWines() {
    if (!this.state.wines) {
      return <Loading/>;
    } else if (this.state.wines.length > 0) {
      const children = [];
      this.state.wines.forEach((wine, index) => children.push(this.getWine(wine, index)));
      return <ul className="list-group">{children}</ul>;
    } else {
      return <p>{noWinesMessage}</p>;
    }
  }

  getWine(wine, index) {
    return <li className="list-group-item" key={index}>{wine.vintage} {wine.winemaker} {wine.variety}</li>;
  }
}

const noWinesMessage = "You have no wine";

export default App;
