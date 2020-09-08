import React from "react";
import { Button, Popover, PopoverBody, PopoverHeader } from "shards-react";
import map_icon from '../../assets/img/icons/map-marker-f.svg';
import './Marker.css';

export default class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: false
    };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        <img
          src={ map_icon }
          open={ this.state.open }
          onClick={ this.toggle }
          id={ this.props.feature.id }
          className="map_marker"
        />
        <Popover
          placement="right"
          open={this.state.open}
          toggle={this.toggle}
          target={ '#' + this.props.feature.code }
          className="popup_custom"
        >
          <PopoverHeader>{ this.props.feature.name }</PopoverHeader>
          <PopoverBody>
            <p className="marker_paragraph"><b>Location:</b> { this.props.feature.location }</p>
            <p className="marker_paragraph"><b>Established:</b> { this.props.feature.established }</p>
            <p className="marker_paragraph"><b>Yearly vistors:</b> { 'baz' }</p>
            <Button block outline size="sm" className="button_primary_custom">Explore →</Button>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}