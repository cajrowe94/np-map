import React from 'react';
import ReactDOM from 'react-dom';
import mapbox from 'mapbox-gl';
import MapMarker from '../MapMarker';
import NationalParkView from '../NationalParkView';
import { CSSTransition } from 'react-transition-group';
import './MapView.css';
import config from '../../config.js';
import axios from 'axios';

mapbox.accessToken = config.REACT_APP_MAPBOX_ACCESS_TOKEN;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderNPView: false,
      selectedNP: null,
    };

    this.handleMarkerAction = this.handleMarkerAction.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.features = [];
  }

  componentDidMount() {
    this.mapInit();
  }

  handleMarkerAction(feature) {
    this.setState({
      renderNPView: true,
      nationalParkId: feature,
    });
  }

  handleClose() {
    this.setState({
      renderNPView: !this.state.renderNPView,
    });
  }

  /**
   * Initialize the map
   * This function also handles the load actions
   */
  mapInit() {
    let self = this;
    // main map object
    this.map = new mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/calp/ckctkan1j2vpo1iqaz17pdpo5',
      center: [-98, 38],
      maxZoom: 8,
      minZoom: 3.5,
      zoom: 4.3,
    });

    // when the map is done loading
    // get the geojson data, national parks, etc.
    this.map.on('load', () => {
      axios.get('/nationalpark', {
        baseURL: 'http://localhost:8000/api/',
        params: {
          country_id: 230,
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      // var npPointsLayer = this.map.getLayer('national-parks');
      // var mapSource = this.map.getSource('composite');

      // // get the feature data
      // var feature_data = this.map.querySourceFeatures('composite', {
      //   'sourceLayer': npPointsLayer.sourceLayer || null,
      // });

      // this.features = feature_data;

      // add all the markers
      // feature_data.forEach(function(feature) {
      //   if ( // check if it actually has longitude + latitude
      //     feature &&
      //     feature.geometry &&
      //     feature.geometry.coordinates
      //   ) {
      //     // create the icon element
      //     let iconContainer = document.createElement('div');
          
      //     new mapbox.Marker(iconContainer)
      //       .setLngLat(feature.geometry.coordinates)
      //       .addTo(self.map);

      //     ReactDOM.render(
      //       <MapMarker
      //         feature={feature}
      //         action={()=>{self.handleMarkerAction(feature)}}
      //       />,
      //       iconContainer
      //     );
      //   }
      // });
    });
  }

  /**
   * Returns all of the map's layers 
   */
  getMapLayers() {
    return this.map.getStyle().layers;
  }

  /**
   * Rebuild the feature data how I want :-)
   */
  structureFeatureData(features) {
    var featureObj = {};

    var i = 1;
    features.forEach(feature => {
      featureObj[i] = {
        feature_id: feature.id,
        name: feature.properties['Name'],
        code: feature.properties['Code'],
        coordinates: feature.geometry.coordinates,
        established: feature.properties['Established'],
        location: feature.properties['Location'],
      };
    });

    return featureObj;
  }

  render() {
    return (
      <div>
        <CSSTransition
          in={this.state.renderNPView}
          timeout={400}
          classNames="np-view"
          unmountOnExit
        >
          <div id="np_view_from_map">
            <NationalParkView feature={this.state.selectedNP} handleClose={this.handleClose}/>
          </div>
        </CSSTransition>
        <div ref={el => this.mapContainer = el} className = 'map-container'/>
      </div>
    )
  }
}

export default MapView;