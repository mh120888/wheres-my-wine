import React, { Component } from 'react';

class WineJailSlot extends Component {
  render() {
    if (this.props.wine) {
        return <div className="wine-jail-slot full" data-wine={JSON.stringify(this.props.wine)}></div>;
      } else {
        return <div className="wine-jail-slot empty"></div>
      }
  }
}

export default WineJailSlot;
