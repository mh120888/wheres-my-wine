import React, { Component } from 'react';
import WineJailSlot from './WineJailSlot';

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
    return <WineJailSlot wine={wine} key={slot}/>;
  }
}

export default WineJail;
