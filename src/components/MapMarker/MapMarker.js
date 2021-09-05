import React from "react";
import ReactDOM from 'react-dom';

import Marker from '../Marker';
import NationalParkView from "../NationalParkView";

import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Place from '@material-ui/icons/Place';
import ChevronRight from '@material-ui/icons/ChevronRight';

import './MapMarker.css';

export default class MapMarker extends React.Component {
  constructor(props) {
    super(props);

    // parent function for button action
    this.action = this.props.action;

    // which national park this marker represents
    this.feature = this.props.feature;

    this.state = {
      anchorEl: null,
    }
  }

  handleMarkerClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    })
  }

  handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
    },() => {
      console.log(this.state.anchorEl);
    });
  }

  // popover button handler
  handlePopoverAction = () => {
    let self = this;

    this.setState({
      anchorEl: null,
    });

    // fire the button action
    setTimeout(()=>{
      self.action();
    }, 200)
  }


  render() {
    return (
      <div
        className="marker"
      >
        <Popover
          open={ Boolean(this.state.anchorEl) }
          anchorEl={ this.state.anchorEl }
          onClose={ this.handlePopoverClose }
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          className="marker-popover"
        >
        <div className="popover-content-container">
          <div
            className="popover-image-container"
            style={
              {
                'background': 'url(' + require('../../assets/img/np/' + this.feature.code + '/thumb.jpg') + ')',
                'background-size': 'cover',
                'background-position': 'center',
              }
            }
          ></div>
          <h4 className="popover-header">{ this.feature.name.replace('National Park', 'NP') }</h4>
          <p className="popover-body">
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          </p>
          <Button
            color="primary"
            onClick={ this.handlePopoverAction }
            className="popover-cta"
          >
            See more
          </Button>
        </div>
        </Popover>
        <Place
          onClick={ this.handleMarkerClick }
        />
      </div>
    );
  }
}
