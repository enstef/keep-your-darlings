import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import api from '../../api';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

import './AddItem.css';

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      //
      picture: "",
      _category: "",
      subcategory: "",
      season: "",
      color: "",
      tags: "",
      brand: "",
      bougthOn: "",
      price: "",
      _id: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    //this.routeChange = this.routeChange.bind(this)
  }
  // routeChange() {
  //   // let path = `/item/:id`;
  //   // let path = `/closet/item/` + id;
  //   // let path = `/item/${this.props.match.params.id}`;

  // }
  handleFileUpload(e) {
    this.setState({
      picture: e.target.files[0]
    })
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRequiredClick(e, category) {
    e.preventDefault()
    this.setState({
      _category: category
    })
  }

  handleOptionalClick(e, value) {
    e.preventDefault()
    if (this.state[e.target.name] === value) {
      this.setState({
        [e.target.name]: ""
      })
    }
    else {
      this.setState({
        [e.target.name]: value
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault()

    let data = {
      picture: this.state.picture,
      _category: this.state._category._id,
      subcategory: this.state.subcategory,
      season: this.state.season,
      color: this.state.color,
      tags: this.state.tags,
      brand: this.state.brand,
      bougthOn: this.state.bougthOn,
      price: this.state.price
    }

    api.postItem(data)
      .then(result => {
        console.log('SUCCESS!')
        console.log('RESULT -->', result)
        let path = `/item/${result.item._id}`
        this.props.history.push(path)
      })
      .catch(err => console.log('ERROR', err))
  }

  render() {
    const seasons = ["Spring", "Summer", "Autmn", "Winter"]
    const colors = ["Black", "White", "Grey", "Red", "Pink", "Yellow", "Blue", "Green", "Brown", "Mixed", "Metallic"]
    return (
      <div className="AddItem">
        <Link to="/closet">Back</Link>
        <h1>Add Item</h1>

        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

          <input type="file" name="picture" onChange={this.handleFileUpload} /> <br />

          Category:
          <div>
            {this.state.categories.map((category, i) => (
              <button onClick={e => this.handleRequiredClick(e, category)} key={i} className={this.state._category === category ? "active" : null}>{category.name}</button>
            ))}
          </div>
          <br />

          {this.state._category &&
            <div>
              {this.state._category.subcategories.map((subcategory, i) => (
                <button name="subcategory" onClick={e => this.handleOptionalClick(e, subcategory)} key={i} className={this.state.subcategory === subcategory ? "active" : null}>{subcategory}</button>
              ))}
            </div>
          }

          Season:
          <div>
            {seasons.map((season, i) => (
              <button name="season" onClick={e => this.handleOptionalClick(e, season)} key={i} className={this.state.season === season ? "active" : null}>{season}</button>
            ))}
          </div>

          Colors:
          <div>
            {colors.map((color, i) => (
              <button name="color" onClick={e => this.handleOptionalClick(e, color)} key={i} className={this.state.color === color ? "active" : null}>{color}</button>
            ))}
          </div>

          Tags:
          <textarea name="tags" value={this.state.tags} cols="30" rows="5" onChange={this.handleInputChange} /> <br />
          Brand:
          <input type="text" name="brand" value={this.state.brand} onChange={this.handleInputChange} /> <br />


          Bought On:
          <input type="date" name="boughtOn" value={this.state.boughtOn} onChange={this.handleInputChange} /> <br />
          Price:
          <input type="number" name="price" value={this.state.price} onChange={this.handleInputChange} /> <br />

          <Button color="primary" className="" type="submit" >Add New Item</Button>
        </form>

      </div>
    );
  }

  componentDidMount() {
    api.getCategories()
      .then(categories => {
        this.setState({
          categories: categories
        })
      })
      .catch(err => console.log(err))
  }
}
export default AddItem;