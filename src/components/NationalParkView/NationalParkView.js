import React from 'react';
import ReactDOM from 'react-dom';
import './NationalParkView.css';
import MapView from "../MapView";
import close_icon from '../../assets/img/icons/close.png';
import collapse_icon from '../../assets/img/icons/collapse.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import np_1 from '../../assets/img/np/1.jpg';
import np_2 from '../../assets/img/np/2.jpg';
import np_3 from '../../assets/img/np/3.jpg';

class NationalParkView extends React.Component {
  constructor(props) {
    super(props);
    this.close_np_view = this.close_np_view.bind(this);
    this.state = {};
  }

  close_np_view() {
    var root_ele = document.getElementsByClassName('root_overlay')[0];
    root_ele.classList.remove("root_overlay_show");
    root_ele.classList.add("root_overlay_hidden");
  }

  componentDidMount() {

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
            <Carousel>
              <div>
                <img src={np_1} />
              </div>
              <div>
                <img src={np_2} />
              </div>
              <div>
                <img src={np_3} />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}

export default NationalParkView;