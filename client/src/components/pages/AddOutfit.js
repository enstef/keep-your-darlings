import React, { Component } from 'react';
import api from '../../api';
import { UncontrolledCollapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import ItemCard from "./ItemCard"

class SelectOutfit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      //
      textsearch: "",
      category: "",
      subcategory: "",
      season: "",
      color: "",
      tags: "",
      brand: "",
      //
      activeIndex: 0
    }
    this.handleTextsearch = this.handleTextsearch.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleTextsearch(e) {
    let textsearch = e.target.value
    this.setState({
      textsearch
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

  handleSelect(e) {
    this.setState({
      brand: e.target.value
    })
  }


  render() {
    const seasons = ["Spring", "Summer", "Autumn", "Winter"]
    const colors = ["Black", "White", "Grey", "Red", "Pink", "Yellow", "Blue", "Green", "Brown", "Mixed", "Metallic"]
    const brands = [...new Set(this.state.items.map(item => item.brand))]
    return (
      <div className="Closet">
        <div className="filter">
          <form>
            <div className="filter-bar">
              <input className="textsearch" type="text" onChange={this.handleTextsearch} placeholder="Search" />
              <button className="link-like-button" id="toggler">Additional Filters</button>
            </div>

            <UncontrolledCollapse className="filter-collapse" toggler="#toggler">
              <div className="filter-section">
                {this.state.categories.map((category, i) => (
                  <button name="_category" onClick={e => this.handleOptionalClick(e, category)} key={i} className={this.state._category === category ? "butt active" : "butt"}>{category.name}</button>
                ))}
              </div>

              {this.state._category &&
                <div className="filter-section">
                  {this.state._category.subcategories.map((subcategory, i) => (
                    <button name="subcategory" onClick={e => this.handleOptionalClick(e, subcategory)} key={i} className={this.state.subcategory === subcategory ? "butt active" : "butt"}>{subcategory}</button>
                  ))}
                </div>
              }
              <div className="filter-section">
                {seasons.map((season, i) => (
                  <button name="season" onClick={e => this.handleOptionalClick(e, season)} key={i} className={this.state.season === season ? "butt active" : "butt"}>{season}</button>
                ))}
              </div>

              <div className="filter-section">
                {colors.map((color, i) => (
                  <button name="color" onClick={e => this.handleOptionalClick(e, color)} key={i} className={this.state.color === color ? "butt active" : "butt " + color}>{color}</button>
                ))}
              </div>

              <div className="filter-section">
                <Dropdown direction="left" isOpen={this.state.btnDropleft} toggle={() => { this.setState({ btnDropleft: !this.state.btnDropleft }); }}>
                  <DropdownToggle className="butt special-needs-butt" caret>Brand</DropdownToggle>
                  <DropdownMenu>
                    {brands.map((brand, i) => (
                      <DropdownItem key={i}>{brand}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>

            </UncontrolledCollapse>
          </form>
        </div>

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
            <a onClick={e => this.props.onAdd(e, item)} key={i}>
              <ItemCard key={item._id} item={item} />
            </a>
          ))}
        </div>
      </div>
    )
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

export default SelectOutfit;