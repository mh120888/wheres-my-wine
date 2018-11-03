import React, { Component } from 'react';
import { 
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverHeader,
  PopoverBody 
} from 'reactstrap';

class WineJailSlot extends Component {
  constructor() {
    super();

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.removeWine = this.removeWine.bind(this);

    this.state = { popoverOpen: false, modalOpen: false };
  }

  render() {
    if (this.props.wine) {
      const wine = JSON.stringify(this.props.wine);
      const id = `wine-${this.props.wine.id}`;
      return <div className="wine-jail-slot full"
                  data-wine={wine}
                  id={id}
                  onClick={this.handleOnClick}
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}>
                  <Popover target={id} isOpen={this.state.popoverOpen} placement="auto">
                    <PopoverHeader>This wine is...</PopoverHeader>
                    <PopoverBody>{this.getWineDisplayText(this.props.wine)}</PopoverBody>
                  </Popover>
                  <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Do something here</ModalHeader>
                    <ModalBody>This is the modal body</ModalBody>
                    <ModalFooter>
                      <Button name="remove-wine" color="danger" onClick={this.removeWine}>
                        Remove Wine
                      </Button>
                      <Button name="close-window" color="secondary" onClick={() => this.setState({ modalOpen: false })}>
                        Close Window
                      </Button>
                    </ModalFooter>
                  </Modal>
              </div>;
    } else {
      return <div className="wine-jail-slot empty"></div>
    }
  }

  removeWine() {
    const shouldDelete = global.confirm("Are you sure you want to remove this wine?");
    if (shouldDelete) {
      fetch(`http://localhost:3001/wines/${this.props.wine.id}`, { method: "DELETE" })
        .then(() => this.props.updateWines());
    }
  }

  handleOnClick() {
    this.setState({ modalOpen: true, popoverOpen: false });
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
