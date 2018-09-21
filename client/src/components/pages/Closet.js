import React, { Component } from 'react';
import api from '../../api';

import ItemCard from "./ItemCard"

class Closet extends Component {
  constructor(props) {
    super(props)
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
    }
    this.handleTextsearch = this.handleTextsearch.bind(this)
  }

  handleTextsearch(e) {
    console.log(e.target.value)
    let textsearch = e.target.value
    this.setState({
      textsearch
    })

    if (!textsearch) {
      api.getCloset()
        .then(items => {
          console.log(items)
          this.setState({
            items: items
          })
        })
        .catch(err => console.log(err))
    }
    
    else {
      api.filterCloset(textsearch)
        .then(items => {
          this.setState({
            items: items
          })
        })
    }
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

  // handleSubmit(e) {
  //   e.preventDefault()

  //   let data = {
  //     textsearch: this.state.textsearch,
  //     _category: this.state._category._id,
  //     subcategory: this.state.subcategory,
  //     season: this.state.season,
  //     color: this.state.color,
  //     brand: this.state.brand,
  //   }

  //   api.filterCloset(data)
  //     .then(items => {
  //       this.setState({
  //         items: items
  //       })
  //     })
  // }

  render() {
    const seasons = ["Spring", "Summer", "Autmn", "Winter"]
    const colors = ["Black", "White", "Grey", "Red", "Pink", "Yellow", "Blue", "Green", "Brown", "Mixed", "Metallic"]
    return (
      <div className="Closet">
        <div className="filter">
          <form>
            <input type="text" onChange={this.handleTextsearch} placeholder="search by keyword" /> <br />

            Category:
          <div>
              {this.state.categories.map((category, i) => (
                <button name="_category" onClick={e => this.handleOptionalClick(e, category)} key={i} className={this.state._category === category ? "active" : null}>{category.name}</button>
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
            {/* got throug all brands yay */}
          </form>
        </div>

        <h2>My Closet</h2>
        {this.state.items.map((item, i) =>
          <ItemCard key={i} item={item} />
        )}
      </div>
    );
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
