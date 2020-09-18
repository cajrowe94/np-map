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
    var data = this.state.data;
    return (
      <Carousel>
        {Object.keys(data).map(function(a) {
          console.log(data[a]);
           return (
            <div>
              <img key={data[a].id} src={data[a].webformatURL} />
            </div>
           );
       })}
      </Carousel>
   )
  }
}

export default NPCarousel;