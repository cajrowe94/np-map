import React from 'react';
import ReactDOM from 'react-dom';

import './NationalParkView.css';

import NPCarousel from "../NPCarousel";
import MapView from "../MapView";

import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

class NationalParkView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeNpView = () => {
    this.props.handleClose()
  }

  componentDidMount() {
    console.log(this.props.feature);
  }

  render() {
    return (
      <div id="np-view">
        <div className="np-view-action-container">
          <IconButton>
            <Close
              onClick={ this.closeNpView }
            />
          </IconButton>
        </div>
        <div className="np-view-container">
          <div className="np-view-header">
            <h1>{this.props.feature.name}</h1>
            {/*<h5 className="h5_title">{this.props.feature.properties.Location + ', United States'}</h5>*/}
            <p>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna 
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
              ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              Duis aute irure dolor in reprehenderit in voluptate velit esse 
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
              cupidatat non proident, sunt in culpa qui officia deserunt 
              mollit anim id est laborum."
            </p>
          </div>
          <div className="np-view-body">
            <NPCarousel feature={this.props.feature} />
          </div>
        </div>
      </div>
    )
  }
}

export default NationalParkView;