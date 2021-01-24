import React from 'react';
import ReactDOM from 'react-dom';
import mapbox from 'mapbox-gl';
import MapMarker from '../MapMarker';
import NationalParkView from "../NationalParkView";
import { CSSTransition } from 'react-transition-group';
import './MapView.css';

mapbox.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_np_view: false,
      selected_feature: null,
    };

    this.handle_marker_action = this.handle_marker_action.bind(this);
    this.handle_close = this.handle_close.bind(this);

    this.features = [];
  }

  componentDidMount() {
    this.map_init();
  }

  handle_marker_action(feature) {
    this.setState({
      show_np_view: true,
      selected_feature: feature,
    });
  }

  handle_close() {
    this.setState({
      show_np_view: !this.state.show_np_view,
    });
  }

  /**
   * Initialize the map
   * This function also handles the load actions
   */
  map_init() {
    let self = this;
    // main map object
    this.map = new mapbox.Map({
      container: this.map_container,
      style: 'mapbox://styles/calp/ckctkan1j2vpo1iqaz17pdpo5',
      center: [-98, 38],
      maxZoom: 8,
      minZoom: 3.5,
      zoom: 4.3,
    });

    // when the map is done loading
    // get the geojson data, features, etc.
    this.map.on('load', () => {
      var np_points_layer = this.map.getLayer('national-parks');
      var map_source = this.map.getSource('composite');

      // get the feature data
      var feature_data = this.map.querySourceFeatures('composite', {
        'sourceLayer': np_points_layer.sourceLayer || null,
      });

      this.features = feature_data;

      // add all the markers
      feature_data.forEach(function(feature) {
        if ( // check if it actually has longitude + latitude
          feature &&
          feature.geometry &&
          feature.geometry.coordinates
        ) {
          // create the icon element
          let icon_container = document.createElement('div');
          
          new mapbox.Marker(icon_container)
            .setLngLat(feature.geometry.coordinates)
            .addTo(self.map);

          ReactDOM.render(
            <MapMarker
              feature={feature}
              action={()=>{self.handle_marker_action(feature)}}
            />,
            icon_container
          );
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
        established: feature.properties['Established'],
        location: feature.properties['Location'],
      };
    });

    return feature_obj;
  }

  render() {
    return (
      <div>
        <CSSTransition
          in={this.state.show_np_view}
          timeout={400}
          classNames="np-view"
          unmountOnExit
        >
          <div id="np_view_from_map">
            <NationalParkView feature={this.state.selected_feature} handle_close={this.handle_close}/>
          </div>
        </CSSTransition>
        <div ref={el => this.map_container = el} className = 'map_container'/>
      </div>
    )
  }
}

export default MapView;