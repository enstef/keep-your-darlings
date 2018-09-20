import React, { Component } from 'react';
import api from '../../api';

import ItemCard from "./ItemCard"

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
        <h2>My Closet</h2>
        {this.state.items.map((item, i) => 
          <ItemCard key={i} item={item} />
        )}
      </div>
    );
  }
}

export default Closet;
