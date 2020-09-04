import React from 'react';
import ReactDOM from 'react-dom';
import mapbox from 'mapbox-gl';
import './Map.css';
import map_icon from '../../assets/img/icons/pastel_mountains.png';
import Marker from '../Marker';

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
    this.map_init();
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
      var np_points_layer = this.map.getLayer('national-parks');
      var map_source = this.map.getSource('composite');

      // get the feature data
      var feature_data = this.structure_feature_data(
        this.map.querySourceFeatures('composite', {
        'sourceLayer': np_points_layer.sourceLayer || null,
      }));

      this.setState({
        features: feature_data,
      });

      // add all the markers
      for (var i in feature_data){
        if ( // check if it actually has longitude + latitude
          feature_data[i] &&
          feature_data[i].coordinates
        ) {
          // create the icon element
          let icon_container = document.createElement('div');
          icon_container.id = feature_data[i].code;
          feature_data[i].id = i;
          
          new mapbox.Marker(icon_container)
            .setLngLat(feature_data[i].coordinates)
            .addTo(this.map);

          ReactDOM.render(
            <Marker feature={ feature_data[i] } />,
            icon_container
          );
        }
      };
    });
  }

  /**
   * Returns all of the map's layers 
   */
  get_map_layers() {
    return this.map.getStyle().layers;
  }

  /**
   * When a geojson feature is clicked on the map
   */
  handle_feature_click(data, container) {
    var id = data.id;
    var feature_data = this.state.features[id];
  }

  /**
   * Rebuild the feature data how I want :-)
   */
  structure_feature_data(features) {
    var feature_obj = {};

    var i = 1;
    features.forEach(feature => {
      feature_obj[i] = {
        feature_id: feature.id,
        name: feature.properties['Name'],
        code: feature.properties['Code'],
        coordinates: feature.geometry.coordinates,
      };
      i++;
    });

    return feature_obj;
  }

  render() {
    return (
      <div>
        <div ref={el => this.map_container = el} className = 'map_container'/>
      </div>
    )
  }
}

export default Map;