import React from 'react';
import ReactDOM from 'react-dom';
import './NationalParkView.css';

class NationalParkView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id="np_view">
        {JSON.stringify(this.props.feature)}
      </div>
    )
  }
}

export default NationalParkView;