import React from "react";
import { Button, Popover, PopoverBody, PopoverHeader } from "shards-react";
import map_icon from '../../assets/img/icons/map-marker-f.svg';
import './Marker.css';

export default class Marker extends React.Component {
  constructor(props) {
    super(props);
    this.toggle_popover = this.toggle_popover.bind(this);
    this.state = {
      open: false
    }
  }

  toggle_popover() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        <img
          src={ map_icon }
          onClick={this.toggle_popover}
          id={this.props.feature.id}
          className="map_marker"
        />
        <InfoPopover open={this.state.open} feature={this.props.feature}/>
      </div>
    );
  }
}

class InfoPopover extends React.Component {
  constructor(props) {
    super(props);
    this.viewNationalPark = this.viewNationalPark.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: this.props.open
    }
  }

  componentWillReceiveProps() {
    this.setState({
      open: this.props.open
    })
  }

  toggle() {
    this.setState({
      open: !this.state.open
    })
  }

  viewNationalPark() {
    console.log('render np view layer');
  }

  render() {
    return (
      <Popover
        placement="right"
        open={this.state.open}
        toggle={this.toggle}
        target={'#' + this.props.feature.code}
        className="popup_custom"
      >
        <PopoverHeader>{ this.props.feature.name }</PopoverHeader>
        <PopoverBody>
          <p className="marker_paragraph"><b>Location:</b> { this.props.feature.location }</p>
          <p className="marker_paragraph"><b>Established:</b> { this.props.feature.established }</p>
          <p className="marker_paragraph"><b>Yearly vistors:</b> { 'baz' }</p>
          <Button
            block
            pill
            size="sm"
            theme="secondary"
            className="button_primary_custom"
            onClick={this.viewNationalPark}
          >
          Explore →
          </Button>
        </PopoverBody>
      </Popover>
    )
  }
}