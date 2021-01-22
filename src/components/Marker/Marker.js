import React from "react";
import ReactDOM from 'react-dom';
import { Button, Popover, PopoverBody, PopoverHeader } from "shards-react";
import NationalParkView from "../NationalParkView";
import map_icon from '../../assets/img/icons/red_marker.svg';
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
          id={this.props.feature.properties.Code}
          className="map_marker"
        />
        <InfoPopover handle_click={this.props.handle_click} open={this.state.open} feature={this.props.feature}/>
      </div>
    );
  }
}

class InfoPopover extends React.Component {
  constructor(props) {
    super(props);
    this.perform_click_action = this.perform_click_action.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: this.props.open
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.open !== prevProps.open) {
      this.setState({
        open: !this.state.open
      })
    }
  } 

  toggle(e) {
    // check if the button was clicked
    // if so, we want to call the perform_click_action function
    // the toggle prop in popover stops any other click events from happening
    // so we have to use the event object in a crusty way :-)
    if (
      e.path &&
      e.path[0] &&
      e.path[0].type === 'button' &&
      e.path[0].className.includes('button_primary_custom')
    ) {
      this.perform_click_action();
    }

    this.setState({
      open: !this.state.open
    })
  }

  perform_click_action() {
    this.props.handle_click(this.props.feature);
  }

  render() {
    return (
      <div>
        <Popover
          placement="right"
          open={this.state.open}
          toggle={this.toggle}
          target={'#' + this.props.feature.properties.Code}
        >
          <PopoverHeader>{ this.props.feature.properties.Name }</PopoverHeader>
          <PopoverBody>
            <p className="marker_paragraph"><b>Location:</b> { this.props.feature.properties.Location }</p>
            <p className="marker_paragraph"><b>Established:</b> { this.props.feature.properties.Established }</p>
            <Button
              block
              size="sm"
              theme="info"
              className="button_primary_custom"
              onClick={this.perform_click_action}
            >
            Explore &rarr;
            </Button>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}