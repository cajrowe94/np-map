import React from 'react';
import ReactDOM from 'react-dom';
import mapbox from 'mapbox-gl';
import './MapView.css';
import Marker from '../Marker';
import NationalParkView from "../NationalParkView";

mapbox.accessToken = 'pk.eyJ1IjoiY2FscCIsImEiOiJja2FvZmFuYWYyMWtnMnhtc2xwamRoMHIzIn0.mY3fqOQI3Gyxmvf8Yg0zag';

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_np_view: false,
      selected_feature: null,
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.features = [];
  }

  componentDidMount() {
    this.map_init();
  }

  handleMarkerClick(feature) {
    this.setState({
      show_np_view: true,
      selected_feature: feature,
    });
  }

  handleClose() {
    this.setState({
      show_np_view: !this.state.show_np_view,
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
      center: [-98, 38],
      zoom: 4.3,
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

      this.features = feature_data;

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
            <Marker feature={ feature_data[i] } handleClick={this.handleMarkerClick} />,
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
   * Rebuild the feature data how I want :-)
   */
  structure_feature_data(features) {
    var feature_obj = {};
    var np = [];

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
      np.push({
        name: feature.properties['Name'],
        code: feature.properties['Code'],
        coordinates: feature.geometry.coordinates,
        established: feature.properties['Established'],
        location: feature.properties['Location'],
        country_id: {
          "$oid": "5fbc5bde854cd137c2fe036d"
        }
      })
      i++;
    });

    console.log(np);
    return feature_obj;
  }

  render() {
    let np_view_from_map = (
      <div id="np_view_from_map">
        <NationalParkView feature={this.state.selected_feature} handleClose={this.handleClose}/>
      </div>
    );

    return (
      <div>
        {this.state.show_np_view && np_view_from_map}
        <div ref={el => this.map_container = el} className = 'map_container'/>
      </div>
    )
  }
}

export default MapView;