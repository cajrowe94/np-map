import React from "react";
import ReactDOM from 'react-dom';

// views
import NationalParkView from "../NationalParkView";

// components
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

// icons
import Place from '@mui/icons-material/Place';
import ChevronRight from '@mui/icons-material/ChevronRight';

// css
import './MapMarker.scss';

export default class MapMarker extends React.Component {
  constructor(props) {
    super(props);

    // parent function for button action
    this.action = this.props.action;

    // which national park this marker represents
    this.feature = this.props.feature;

    this.state = {
      anchorElement: null,
    }
  }

  handleMarkerClick = (e) => {
    this.setState({
      anchorElement: e.currentTarget,
    });
  }

  handlePopoverClose = () => {
    this.setState({
      anchorElement: null,
    });
  }

  // popover button handler
  handlePopoverAction = () => {
    let self = this;

    this.setState({
      anchorElement: null,
    });

    // fire the button action
    setTimeout(()=>{
      self.action();
    }, 200)
  }

  // craft some css for the popover
  style = (featureCode) => {
    if (featureCode) {
      return {
        backgroundImage: 'url(' + require('../../assets/img/np/' + featureCode + '/thumb.jpg').default + ')'
      }
    }
  }


  render() {
    return (
      <div className="marker">
        <Popover
          open={ Boolean(this.state.anchorElement) }
          anchorEl={ this.state.anchorElement }
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
              style={this.style(this.feature.code)}
            >
              <h4 className="popover-header">{ this.feature.name.replace('National Park', 'NP') }</h4>
            </div>
            <div className="popover-body">
              <p><b>Location</b><br /> { this.feature.region_name + ', ' + this.feature.country_name }</p>
              <p><b>Established</b><br /> { this.feature.established }</p>
            </div>
            <div className="popover-cta-container">
              <Chip 
                label="Learn more"
                onClick={ this.handlePopoverAction }
                variant="outlined"
              />
            </div>
          </div>
        </Popover>
        <Place
          onClick={ this.handleMarkerClick }
          className="marker-svg"
        />
      </div>
    );
  }
}
