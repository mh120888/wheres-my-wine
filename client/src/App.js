import React, { Component } from 'react';
import WineList from './WineList';
import WineJail from './WineJail';
import Loading from './Loading';

class App extends Component {
  constructor() {
    super();

    this.getAllWines = this.getAllWines.bind(this);
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

  displayWines() {
    if (!this.state.wines) {
      return <Loading/>;
    } else if (this.state.wines.length > 0) {
      return <div>
        <WineJail/>
        <WineList wines={this.state.wines} getAllWines={this.getAllWines}/>
      </div>;
    } else {
      return <p>{noWinesMessage}</p>;
    }
  }

  componentWillMount() {
    this.getAllWines();
  }

  getAllWines() {
    fetch("http://localhost:3001/wines/")
      .then(response => response.json())
      .then(json => this.setState({ wines: json }));
  }
}

const noWinesMessage = "You have no wine";

export default App;
