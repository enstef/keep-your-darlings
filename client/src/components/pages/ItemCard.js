import React, { Component } from 'react';

class ItemCard extends Component {
  render() {
    return (
      <div className="ItemCard">
          <img src={this.props.item.pictureUrl} alt="item"/>
      </div>
    );
  }
}

export default ItemCard;
