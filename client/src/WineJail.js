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
    const wine = this.props.wines.find((wine) => wine.position == slot);
    if (wine) {
      return <div className="wine-jail-slot full" key={slot} data-wine={JSON.stringify(wine)}></div>
    } else {
      return <div className="wine-jail-slot" key={slot}></div>
    }
  }
}

export default WineJail;
