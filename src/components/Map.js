import React from 'react';
import ReactDOM from 'react-dom';
import mapbox from 'mapbox-gl';
import map_icon from '../img/icons/map_marker.svg';
mapbox.accessToken = 'pk.eyJ1IjoiY2FscCIsImEiOiJja2FvZmFuYWYyMWtnMnhtc2xwamRoMHIzIn0.mY3fqOQI3Gyxmvf8Yg0zag';

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
    // initialize the map
    this.map_init();

    this.map.on('move', () => { 
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    });
  }

  /**
   * Initialize the map
   * This function also handles the load actions
   */
  map_init() {
    // main map object
    this.map = new mapbox.Map({
      container: this.map_container,
      style: 'mapbox://styles/calp/ckctkan1j2vpo1iqaz17pdpo5',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    // when the map is done loading
    // get the geojson data, features, etc.
    this.map.on('load', () => {
      var np_points_layer = this.map.getLayer('National park points');
      var map_source = this.map.getSource('composite');
      var np_points_geo_json = this.map.querySourceFeatures('composite', {
        'sourceLayer': np_points_layer.sourceLayer || null,
      });

      this.setState({
        features: np_points_geo_json,
      });

      // add all the markers
      this.state.features.forEach(feature => {
        if ( // check if it actuall has longitude + latitude
          feature.geometry &&
          feature.geometry.coordinates &&
          feature.geometry.coordinates.length === 2
        ) {
          // create the icon element
          let icon = document.createElement('img');
          icon.setAttribute('src', map_icon);
          icon.classList.add('map_marker');


          console.log(icon);

          new mapbox.Marker(icon)
            .setLngLat(feature.geometry.coordinates)
            .addTo(this.map);
        }
      });
    });
  }

  /**
   * Returns all of the map's layers 
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