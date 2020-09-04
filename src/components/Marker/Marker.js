import React from "react";
import { Button, Popover, PopoverBody, PopoverHeader } from "shards-react";
import map_icon from '../../assets/img/icons/pastel_mountains.png';

export default class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.close_popout = this.close_popout.bind(this);
    this.open_popout = this.open_popout.bind(this);
    this.state = {
      open: false
    };
  }

  close_popout() {
    this.setState({ open: false });
  }

  open_popout() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div>
        <img
          src={ map_icon }
          onMouseEnter={this.open_popout}
          onMouseLeave={this.close_popout}
          id={ this.props.feature.id }
          className="map_marker"
        />
        <Popover
          placement="right"
          open={this.state.open}
          toggle={this.toggle}
          target={ '#' + this.props.feature.code }
        >
          <PopoverHeader>{ this.props.feature.name }</PopoverHeader>
          <PopoverBody>{ JSON.stringify(this.props.feature) }</PopoverBody>
        </Popover>
      </div>
    );
  }
}