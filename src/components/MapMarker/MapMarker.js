import React from "react";
import ReactDOM from 'react-dom';
import Marker from '../Marker';
import NationalParkView from "../NationalParkView";
import Popover from '@material-ui/core/Popover';
import './MapMarker.css';

export default class MapMarker extends Marker {
  constructor(props) {
    super(props);

    // parent function for button action
    this.action = this.props.action;

    // which national park this marker represents
    this.feature = this.props.feature.properties;

    // bind our functions, rip
    this.togglePopover = this.togglePopover.bind(this);
    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.markerOnHover = this.markerOnHover.bind(this);
    this.markerOnLeave = this.markerOnLeave.bind(this);
    this.buttonClick = this.buttonClick.bind(this);

    this.state = {
      popoverOpen: false,
      tooltipOpen: false,
    }
  }

  // open/closes the info popover
  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
      tooltipOpen: false,
    });
  }

  // show/hides the tooltip
  // only happens on hover, clicking will hide
  toggleTooltip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  // animate marker + open tooltip
  markerOnHover() {
    if (!this.state.popoverOpen) {
      this.setState({
        tooltipOpen: true,
      });
    }
  }

  // animate marker down + hide tooltip
  markerOnLeave() {
    this.setState({
      tooltipOpen: false,
    });
  }

  // button click handler
  buttonClick() {
    // close the popover
    // the toggle prop in Popover stops click events
    // so I have to close it within the button handler
    this.setState({
      'popoverOpen': false,
    });

    // fire the button action
    this.action();
  }


  render() {
    return (
      <div>
       {/* <Tooltip
          open = { this.state.tooltipOpen }
          target = { '#' + this.feature.Code }
          noArrow = { true }
          offset = "0 10 0 0"
        >
          { this.feature.Name }
        </Tooltip>*/}

        { this.getMarkerIcon() }

        <Popover 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          The content of the Popover.
        </Popover>

        {/*<Popover
          placement = "top"
          open = { this.state.popoverOpen }
          target = { '#' + this.feature.Code }
        >
          <PopoverHeader>{ this.feature.Name }</PopoverHeader>
          <PopoverBody>
            <p className = "marker_paragraph"><b>Location:</b> { this.feature.Location }</p>
            <p className = "marker_paragraph"><b>Established:</b> { this.feature.Established }</p>
            <Button
              block
              size = "sm"
              theme = "info"
              className = "button_primary_custom"
              onClick = { this.buttonClick }
            >
            Explore &rarr;
            </Button>
          </PopoverBody>
        </Popover>*/}
      </div>
    );
  }
}
