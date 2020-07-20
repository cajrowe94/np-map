import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FscCIsImEiOiJja2FvZmFuYWYyMWtnMnhtc2xwamRoMHIzIn0.mY3fqOQI3Gyxmvf8Yg0zag';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.map_container,
      style: 'mapbox://styles/calp/ckctkan1j2vpo1iqaz17pdpo5',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    return (
      <div>
        <div className='sidebar_style'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.map_container = el} className = 'map_container'/>
      </div>
    )
  }
}

export default Map;