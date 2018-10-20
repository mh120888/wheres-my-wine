import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class WineJailSlot extends Component {
  constructor() {
    super();

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = { popoverOpen: false };
  }

  render() {
    if (this.props.wine) {
      const wine = JSON.stringify(this.props.wine);
      const id = `wine-${this.props.wine.id}`;
      return <div className="wine-jail-slot full"
                  data-wine={wine}
                  id={id}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}>
                  <Popover target={id} isOpen={this.state.popoverOpen} placement="auto">
                    <PopoverHeader>This wine is...</PopoverHeader>
                    <PopoverBody>{this.getWineDisplayText(this.props.wine)}</PopoverBody>
                  </Popover>
              </div>;
    } else {
      return <div className="wine-jail-slot empty"></div>
    }
  }

  handleMouseEnter() {
    this.setState({ popoverOpen: true });
  }

  handleMouseLeave() {
    this.setState({ popoverOpen: false });
  }

  getWineDisplayText(wine) {
    return `${wine.vintage} ${wine.winemaker} ${wine.variety} from ${wine.region}`;
  }
}

export default WineJailSlot;
