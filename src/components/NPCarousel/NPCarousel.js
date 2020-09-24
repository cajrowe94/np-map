import React from 'react';
import ReactDOM from 'react-dom';
import './NPCarousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

class NPCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.get_np_photos = this.get_np_photos.bind(this);
    this.state = {
      feature: this.props.feature,
      data: {},
    };
  }

  componentDidMount() {
    this.get_np_photos();
  }

  get_np_photos() {
    
  }

  render() {
    return (
      <Carousel>
        <div>
          <img
            src={require("../../assets/img/np/" + this.props.feature.code + "/" + this.props.feature.code + "_1.jpg")}
          />
        </div>
        <div>
          <img
            src={require("../../assets/img/np/" + this.props.feature.code + "/" + this.props.feature.code + "_2.jpg")}
          />
        </div>
        <div>
          <img
            src={require("../../assets/img/np/" + this.props.feature.code + "/" + this.props.feature.code + "_3.jpg")}
          />
        </div>
        <div>
          <img
            src={require("../../assets/img/np/" + this.props.feature.code + "/" + this.props.feature.code + "_4.jpg")}
          />
        </div>
      </Carousel>
   )
  }
}

export default NPCarousel;