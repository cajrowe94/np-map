import React from "react";
import ReactDOM from 'react-dom';
import Anime from 'animejs';
import { Button, Popover, PopoverBody, PopoverHeader, Tooltip } from "shards-react";
import NationalParkView from "../NationalParkView";
import map_icon from '../../assets/img/icons/red_marker.svg';
import './MapMarker.css';

export default class MapMarker extends React.Component {
  constructor(props) {
    super(props);

    // parent function for button action
    this.action = this.props.action;

    // which national park this marker represents
    this.feature = this.props.feature.properties;

    // bind our functions, rip
    this.toggle_popover = this.toggle_popover.bind(this);
    this.toggle_tooltip = this.toggle_tooltip.bind(this);
    this.marker_on_hover = this.marker_on_hover.bind(this);
    this.marker_on_leave = this.marker_on_leave.bind(this);
    this.button_click = this.button_click.bind(this);

    this.state = {
      popover_open: false,
      tooltip_open: false,
    }

    this.init_marker_image();
  }

  // set the defaults for our marker image
  // todo add some params for this class
  // color, size, etc
  init_marker_image() {
    this.img = (<img
      src={map_icon}
      onClick={this.toggle_popover}
      onMouseEnter={this.marker_on_hover}
      onMouseLeave={this.marker_on_leave}
      id={this.feature.Code}
      className="map_marker"
    />);
  }

  // open/closes the info popover
  toggle_popover() {
    this.setState({
      popover_open: !this.state.popover_open,
      tooltip_open: false,
    });
  }

  // show/hides the tooltip
  // only happens on hover, clicking will hide
  toggle_tooltip() {
    this.setState({
      tooltip_open: !this.state.tooltip_open
    });
  }

  // animate marker + open tooltip
  marker_on_hover() {
    Anime({
      targets: ('#' + this.feature.Code),
      height: 42,
      translateY: -5,
    });

    this.setState({
      tooltip_open: true,
    });
  }

  // animate marker down + hide tooltip
  marker_on_leave() {
    Anime({
      targets: ('#' + this.feature.Code),
      height: 32,
      translateY: 5,
    });

    this.setState({
      tooltip_open: false,
    });
  }

  // button click handler
  button_click() {
    // close the popover
    // the toggle prop in Popover stops click events
    // so I have to close it within the button handler
    this.setState({
      'popover_open': false,
    });

    // fire the button action
    this.action();
  }

  render() {
    return (
      <div>
        <Tooltip
          open={this.state.tooltip_open}
          target={'#' + this.feature.Code}
          noArrow={true}
          offset="0 10 0 0"
        >
          {this.feature.Name}
        </Tooltip>
        {this.img}
        <Popover
          placement="top"
          open={this.state.popover_open}
          target={'#' + this.feature.Code}
        >
          <PopoverHeader>{this.feature.Name}</PopoverHeader>
          <PopoverBody>
            <p className="marker_paragraph"><b>Location:</b> {this.feature.Location}</p>
            <p className="marker_paragraph"><b>Established:</b> {this.feature.Established}</p>
            <Button
              block
              size="sm"
              theme="info"
              className="button_primary_custom"
              onClick={this.button_click}
            >
            Explore &rarr;
            </Button>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
