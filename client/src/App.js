import React, { Component } from 'react';
import WineList from './WineList';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="display-1 text-center">Where's My Wine?</h1>
        <WineList/>
      </div>
    );
  }
}

export default App;
