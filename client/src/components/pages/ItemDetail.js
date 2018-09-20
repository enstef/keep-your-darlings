import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import api from '../../api'

// import './ItemDetail.css';
class ItemDetail extends Component {
  constructor(props){
      super(props);
      this.state = {
      name: "",
      tags: "",
      _category: "",
      season: [],
      color: [],
      boughtOn: "",
      price: "",
      pictureUrl: "",
      categories: []
    }
  }
    render() {
      return (
        <div className="item-detail">
        <Link to="/closet">Back</Link>
        <h1>ldkgroihgofhgpoiefhgofhpgoirhfodh</h1>
          <img src={this.props.pictureUrl} alt="item" />
        <p>{this.props.name}</p>   
        <p>{this.props.tags}</p> 
        <p>{this.props._category}</p>
        <p>{this.props.season}</p>
        <p>{this.props.color}</p>
        <p>{this.props.boughtOn}</p>
        <p>{this.props.price}</p>
        <p>{this.props.wornOn}</p>
        { this.props.wornOn && <p>Good Job wearing! 😉 </p> }
        { !this.props.wornOn && <p>Never worn yet! 😔 </p> }
        <p>{this.props._owner}</p>
          <button onClick={this.props.clickToDelete}>Delete</button>
      </div>
      );
    }
    }
export default ItemDetail;