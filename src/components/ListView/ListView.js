import React from 'react';
import ReactDOM from 'react-dom';

class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <div ref={el => this.list_container = el} className = 'list_container'/>
      </div>
    )
  }
}

export default ListView;