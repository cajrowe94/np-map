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
      </Carousel>
   )
  }
}

export default NPCarousel;