import React, { Component } from 'react';
import { Link } from "react-router-dom"
import api from '../../api';
import { UncontrolledCollapse } from 'reactstrap';

import ItemCard from "./ItemCard"

class Closet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      untouchedItems: [],
      categories: [],
      //
      textsearch: "",
      _category: "",
      subcategory: "",
      season: "",
      color: "",
      tags: "",
      brand: "",
    }
    this.handleTextsearch = this.handleTextsearch.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleTextsearch(e) {
    console.log(e.target.value)
    let textsearch = e.target.value
    this.setState({
      textsearch
    })
  }

  handleOptionalClick(e, value) {
    console.log(this.state[e.target.name])
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

  handleSelect(e) {
    this.setState({
      brand: e.target.value
    })
  }

  render() {
    const seasons = ["Spring", "Summer", "Autmn", "Winter"]
    const colors = ["Black", "White", "Grey", "Red", "Pink", "Yellow", "Blue", "Green", "Brown", "Mixed", "Metallic"]
    const brands = [...new Set(this.state.items.map(item => item.brand))]
    return (
      <div className="Closet">
        <div className="filter">
          <form>
            <input className="textsearch" type="text" onChange={this.handleTextsearch} placeholder="search by keyword" /> <br />

            <button className="link-like-button"id="toggler">Additional Filters</button>

            <UncontrolledCollapse toggler="#toggler">
              Category:
          <div>
                {this.state.categories.map((category, i) => (
                  <button id="toggler" name="_category" onClick={e => this.handleOptionalClick(e, category)} key={i} className={this.state._category === category ? "active" : null}>{category.name}</button>
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

              Brand:
            <select name="brand" onChange={this.handleSelect}>
                <option value="">All</option>
                {brands.map((brand, i) => (
                  <option key={i}>{brand}</option>
                ))}
              </select>
            </UncontrolledCollapse>
          </form>
        </div>

        <h2>My Closet</h2>
        <div className="item-list">
          {this.state.items.filter(item => {
            return (
              item.tags.toUpperCase().includes(this.state.textsearch.toUpperCase())
              && (this.state._category ? (item._category === this.state._category._id) : item)
              && (this.state.subcategory ? (item.subcategory === this.state.subcategory) : item)
              && (this.state.season ? (item.season === this.state.season) : item)
              && (this.state.color ? (item.color === this.state.color) : item)
              && (this.state.brand ? (item.brand === this.state.brand) : item)
            )
          }).map((item, i) => (
            <Link to={`/closet/item/${item._id}`} key={i}><ItemCard item={item} /></Link>
          ))}
        </div>

        <Link to="/add-item">
          <button className="adder">Add</button>
        </Link>
      </div>
    );
  }

  componentDidMount() {

    api.getCloset()
      .then(items => {
        this.setState({
          items: items,
          untouchedItems: items
        })
      })
      .catch(err => console.log(err))

    api.getCategories()
      .then(categories => {
        this.setState({
          categories: categories
        })
      })
      .catch(err => console.log(err))
  }
}

export default Closet;
