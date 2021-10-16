import React from 'react';
import ReactDOM from 'react-dom';

// css
import './NationalParkView.scss';

// components
import MapView from "../MapView";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

// icons
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';

class NationalParkView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closeNpView = () => {
    this.props.handleClose();
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div id="np-view">
        {/* Close button */}
        <div className="np-view-action-container">
          <IconButton
            onClick={ this.closeNpView }
          >
            <Close />
          </IconButton>
        </div>

        {/* Main container */}
        <Container maxWidth="lg">
          { /* Header */ }
          <Grid container >
            <Grid item xs={ 12 }>
              <div className="np-view-header">
                <h1 className="mb-0">{ this.props.feature.name }</h1>
                <p className="header-subtitle">{ this.props.feature.region_name + ', ' + this.props.feature.country_name }</p>
              </div>
            </Grid>
          </Grid>

        </Container>
      </div>
    )
  }
}

export default NationalParkView;