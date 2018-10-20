import React, { Component } from 'react';

class WineJail extends Component {
  render() {
    const wineJailSlots = [];
    for (let slot = 1; slot < 97; slot++) {
      wineJailSlots.push(this.renderWineJailSlot(slot));
    }

    return (
      <div className="wine-jail">
        {wineJailSlots}
      </div>
    );
  }

  renderWineJailSlot(slot) {
    return <div className="wine-jail-slot" key={slot}></div>
  }
}

export default WineJail;
