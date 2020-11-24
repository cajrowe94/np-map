import React from 'react';
import ReactDOM from 'react-dom';
import './NationalParkView.css';
import close_icon from '../../assets/img/icons/close.png';
import collapse_icon from '../../assets/img/icons/collapse.png';
import NPCarousel from "../NPCarousel";
import MapView from "../MapView";

class NationalParkView extends React.Component {
  constructor(props) {
    super(props);
    this.close_np_view = this.close_np_view.bind(this);
    this.state = {};
  }

  close_np_view() {
    this.props.handleClose()
  }

  componentDidMount() {
    console.log(this.props.feature);
  }

  render() {
    return (
      <div id="np_view">
        <div className="np_view_action_container">
          <img src={collapse_icon} id="np_icon"/>
          <img src={close_icon} id="np_icon" onClick={this.close_np_view}/>
        </div>
        <div className="np_view_container">
          <div className="np_view_header">
            <h1 className="h1_title">{this.props.feature.name}</h1>
            <h5 className="h5_title">{this.props.feature.location + ', United States'}</h5>
            <p className="p_text">
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
          <div className="np_view_body">
            <NPCarousel feature={this.props.feature} />
          </div>
        </div>
      </div>
    )
  }
}

export default NationalParkView;