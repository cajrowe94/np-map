import React from 'react';
import ReactDOM from 'react-dom';

// components
import MapMarker from '../MapMarker';
import NationalParkView from '../NationalParkView';
import Grow from '@mui/material/Grow';

// css
import './MapView.scss';

// config/libs
import config from '../../config.js';
import axios from 'axios';
import mapbox from 'mapbox-gl';

mapbox.accessToken = config.MAPBOX_ACCESS_TOKEN;

class MapView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      renderNPView: false,
      selectedFeature: null,
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
      selectedFeature: feature,
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

    // main mapbox object
    this.map = new mapbox.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/calp/ckctkan1j2vpo1iqaz17pdpo5',
      center: [-98, 38],
      maxZoom: 8,
      minZoom: 3.5,
      zoom: 4.3,
    });

    // when the map is done loading
    // get national park data
    this.map.on('load', () => {
      axios.get('/national_park', {
        baseURL: 'http://localhost:8000/api/',
        params: {
          country_id: 230,
        }
      })
      .then(function (response) {
        self.features = response.data;

        self.features.forEach(function(feature) {
          if ( // check if it actually has longitude + latitude
            feature &&
            feature.longitude &&
            feature.latitude
          ) {
            // create the icon element
            let markerContainer = document.createElement('div');
            
            new mapbox.Marker(markerContainer)
              .setLngLat([feature.longitude, feature.latitude])
              .addTo(self.map);

            ReactDOM.render(
              <MapMarker
                feature={feature}
                action={()=>{self.handleMarkerAction(feature)}}
              />,
              markerContainer
            );
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    });
  }

  render() {
    return (
      <div>
        <Grow
          in={this.state.renderNPView}
          timeout={400}
          classNames="np-view"
          unmountOnExit
        >
          <div id="np-view-from-map">
            <NationalParkView
              feature={this.state.selectedFeature}
              handleClose={this.handleClose}
            />
          </div>
        </Grow>
        <div ref={el => this.mapContainer = el} className = 'map-container'/>
      </div>
    )
  }
}

export default MapView;