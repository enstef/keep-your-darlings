import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api'

class ItemCard extends Component {
  render() {
    return (
      <div className="ItemCard">
        <Link to="/closet/item/:id"><img src={this.props.item.pictureUrl} alt="item" width="200" height="200" /></Link>

        <Link to={`/closet/item/${this.props.item.id}`}>
          <img src={this.props.item.pictureUrl} alt="item" width="200" height="200" />
        </Link>

        <h1>{this.props.item.name}</h1>
      </div>
    );
  }
}

export default ItemCard;
