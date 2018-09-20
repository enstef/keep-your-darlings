import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import api from '../../api'

import './AddItem.css';

class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      picture: "",
      _category: "",
      subcategory: "",
      season: "",
      color: "",
      tags: "",
      brand: "",
      bougthOn: "",
      price: "",

      categories: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

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

  handleCategoryClick(e, category) {
    e.preventDefault()
    this.setState({
      _category: category
    })
  }

  handleSubClick(e, subcategory) {
    e.preventDefault()
    this.setState({
      subcategory: subcategory
    })
  }
  handleColorClick(e, color) {
    e.preventDefault()
    this.setState({
      color: color
    })
  }
  handleSeasonClick(e, season) {
    e.preventDefault()
    this.setState({
      season: season
    })
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
        this.props.history.push("/closet")
          .catch(err => {
            console.log('ERROR')
          })
      })
  }

  render() {
    return (
      <div className="AddItem">
        <Link to="/closet">Back</Link>
        <h1>Add Item</h1>

        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

          <input type="file" name="picture" onChange={this.handleFileUpload} /> <br />

          Category:
          <div>
            {this.state.categories.map((category, i) => (
              <button onClick={e => this.handleCategoryClick(e, category)} key={i} className={this.state._category === category ? "active" : null}>{category.name}</button>
            ))}
          </div>
          <br />

          {this.state._category &&
            <div>
              {this.state._category.subcategories.map((subcategory, i) => (
                <button onClick={e => this.handleSubClick(e, subcategory)} key={i} className={this.state.subcategory === subcategory ? "active" : null}>{subcategory}</button>
              ))}
            </div>
          }

          Season:
          <div>
            <button onClick={e => this.handleSeasonClick(e, "spring")} className={this.state.season === "spring" ? "active" : "spring"}>spring</button>
            <button onClick={e => this.handleSeasonClick(e, "summer")} className={this.state.season === "summer" ? "active" : "summer"}>summer</button>
            <button onClick={e => this.handleSeasonClick(e, "autumn")} className={this.state.season === "autumn" ? "active" : "autumn"}>autumn</button>
            <button onClick={e => this.handleSeasonClick(e, "winter")} className={this.state.season === "winter" ? "active" : "winter"}>winter</button>
          </div>

          Colors:
          <div>
            <button onClick={e => this.handleColorClick(e, "black")} className={this.state.color === "black" ? "active" : "black"}>black</button>
            <button onClick={e => this.handleColorClick(e, "white")} className={this.state.color === "white" ? "active" : "white"}>white</button>
            <button onClick={e => this.handleColorClick(e, "grey")} className={this.state.color === "grey" ? "active" : "grey"}>grey</button>
            <button onClick={e => this.handleColorClick(e, "mixed")} className={this.state.color === "mixed" ? "active" : "mixed"}>mixed</button>
            <button onClick={e => this.handleColorClick(e, "red")} className={this.state.color === "red" ? "active" : "red"}>red</button>
            <button onClick={e => this.handleColorClick(e, "pink")} className={this.state.color === "pink" ? "active" : "pink"}>pink</button>
            <button onClick={e => this.handleColorClick(e, "yellow")} className={this.state.color === "yellow" ? "active" : "yellow"}>yellow</button>
            <button onClick={e => this.handleColorClick(e, "blue")} className={this.state.color === "blue" ? "active" : "blue"}>blue</button>
            <button onClick={e => this.handleColorClick(e, "green")} className={this.state.color === "green" ? "active" : "green"}>green</button>
            <button onClick={e => this.handleColorClick(e, "brown")} className={this.state.color === "brown" ? "active" : "brown"}>brown</button>
            <button onClick={e => this.handleColorClick(e, "metallic")} className={this.state.color === "metallic" ? "active" : "metallic"}>metallic</button>
          </div>

          Tags:
          <textarea name="tags" value={this.state.tags} cols="30" rows="5" onChange={this.handleInputChange} /> <br />
          Brand:
          <input type="text" name="brand" value={this.state.brand} onChange={this.handleInputChange} /> <br />


          Bought On:
          <input type="date" name="boughtOn" value={this.state.boughtOn} onChange={this.handleInputChange} /> <br />
          Price:
          <input type="number" name="price" value={this.state.price} onChange={this.handleInputChange} /> <br />

          <button type="submit">Add New Item</button>
        </form>

      </div>
    );
  }

  componentDidMount() {
    api.getCategories()
      .then(categories => {
        console.log(categories)
        this.setState({

          categories: categories
        })
      })
      .catch(err => console.log(err))
  }
}
export default AddItem;