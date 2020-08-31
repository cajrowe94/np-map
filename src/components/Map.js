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
    this.map = new mapboxgl.Map({
      container: this.map_container,
      style: 'mapbox://styles/calp/ckctkan1j2vpo1iqaz17pdpo5',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    this.map.on('load', () => {
      console.log(this.get_map_layers());
      var np_points_layer = this.map.getLayer('National park points');
      var map_source = this.map.getSource('composite');
      console.log(map_source);
      var np_points_geo_json = this.map.querySourceFeatures('composite', {
        'sourceLayer': np_points_layer.sourceLayer || null,
      });

      this.setState({
        features: np_points_geo_json,
      })
    });

    this.map.on('move', () => { 
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
  }

  /*
  Returns all of the map's layers
   */
  get_map_layers() {
    return this.map.getStyle().layers;
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