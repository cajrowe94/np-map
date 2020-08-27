import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2FscCIsImEiOiJja2FvZmFuYWYyMWtnMnhtc2xwamRoMHIzIn0.mY3fqOQI3Gyxmvf8Yg0zag';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -98,
      lat: 38,
      zoom: 4.3,
      features: [],
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.map_container,
      style: 'mapbox://styles/calp/ckctkan1j2vpo1iqaz17pdpo5',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('load', () => { //
      var np_points_layer = map.getLayer('National park points');
      var map_source = map.getSource('composite');
      var np_points_geo_json = map.querySourceFeatures('composite', {
        'sourceLayer': np_points_layer.sourceLayer || null,
      });

      this.setState({
        features: np_points_geo_json,
      })
      console.log(np_points_geo_json);
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