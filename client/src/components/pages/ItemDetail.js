import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import api from '../../api'
// import './ItemDetail.css';

class ItemDetail extends Component {
  constructor(props){
    super(props)
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
        <div className="ItemDetail">
        <Link to="/closet">Back</Link>
        <h1>Look, one of your Darlings!</h1>
          <img src={this.state.pictureUrl} alt="item" width="500" height="500"/>
        <h1>{this.state.name}</h1>   
        <p>{this.state.tags}</p> 
        <p>{this.state._category}</p>
        <p>{this.state.season}</p>
        <p>{this.state.color}</p>
        <p>{this.state.boughtOn}</p>
        <p>{this.state.price}</p>
        <p>{this.state.wornOn}</p>
        { this.state.wornOn && <p>Good Job wearing! 😉 </p> }
        { !this.state.wornOn && <p>Never worn yet! 😔 </p> }
        <p>{this.state._owner}</p>
          <button onClick={this.state.clickToDelete}>Delete</button>
      </div>
      );
    }
    componentDidMount() {
      api.getItem(this.props.match.params.id)
        .then(item => {
          console.log(item)
          this.setState({
            item: item,
            name: item.name,
            tags: item.tags,
            _category: item._category,
            season: item.season,
            color: item.color,
            boughtOn: item.boughtOn,
            price: item.price,
            pictureUrl: item.pictureUrl,
            categories: item.categories
          })
        })
        .catch(err => console.log(err))
    }
}
export default ItemDetail;