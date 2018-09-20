import React, { Component } from 'react';
import api from '../../api';

class Closet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    api.getCloset()
      .then(items => {
        console.log(items)
        this.setState({
          items: items
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="Closet">
        <h2>List of items</h2>
        {this.state.items.map((c, i) => <li key={i}>{c.name}</li>)}
      </div>
    );
  }
}

export default Closet;
