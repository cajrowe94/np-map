import React from "react";
import ReactDOM from 'react-dom';
import Terrain from '@material-ui/icons/Terrain';
import Popover from '@material-ui/core/Popover';
import './Marker.css';

export default class Marker extends React.Component {
  constructor(props) {
    super(props);

    // hover and click actions
    this.markerHoverEnterAction = props.markerEnterHoverAction;
    this.markerHoverLeaveAction = props.markerLeaveHoverAction;
    this.markerClickAction = props.markerClickAction;

    // marker options
    this.markerColor = props.markerColor;

    this.state = {
      'anchorEl': null,
    }
  }

  handleMarkerClick = (e) => {
    this.setState({
      'anchorEl': e.currentTarget,
    })
  }

  handlePopoverClose = () => {
    this.setState({
      'anchorEl': null,
    });
  }

  setAnchorEl(el) {
    this.setState({
      'anchorEl': el,
    })
  }

  // run our hover enter function
  markerOnHoverEnter() {
    if (
      this.markerHoverEnterAction &&
      typeof this.markerHoverEnterAction === 'function'
    ) { 
      this.markerHoverEnterAction();
    }
  }

  // run our hover leave function
  markerOnHoverLeave() {
    if (
      this.markerHoverLeaveAction &&
      typeof this.markerHoverLeaveAction === 'function'
    ) {
      this.markerHoverLeaveAction();
    }
  }

  markerOnClick() {
    if (
      this.markerClickAction &&
      typeof this.markerClickAction === 'function'
    ) {
      this.markerClickAction();
    }
  }

  getMarkerIcon() {
    return <Terrain />
  }

  render() {
    return (
      <div
        className="marker"
        onClick={ this.handleMarkerClick }
      >
        <Popover
          open={ Boolean(this.state.anchorEl) }
          anchorEl={ this.state.anchorEl }
          onClose={ this.handlePopoverClose }
        >
          The content of the Popover.
        </Popover>
        { this.getMarkerIcon() }
      </div>
    )
  }
}
