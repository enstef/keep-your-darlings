import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import api from '../../api';
import moment from "moment"
import back from "../../images/back.svg"

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
      tags: "#",
      brand: "",
      boughtOn: moment().format("YYYY-MM-D"),
      price: 0,
      _id: "",
      //
      uploaded: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleHashtag = this.handleHashtag.bind(this)
    //this.routeChange = this.routeChange.bind(this)
  }
  // routeChange() {
  //   // let path = `/item/:id`;
  //   // let path = `/closet/item/` + id;
  //   // let path = `/item/${this.props.match.params.id}`;
  // }

  handleFileUpload(e) {
    console.log(e.target.files[0])
    this.setState({
      picture: e.target.files[0],
      uploaded: true
    })
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleHashtag(e) {
    const oldtags = this.state.tags
    if (e.which === 32) {
      e.preventDefault();
      this.setState({
        tags: oldtags + " #"
      })
    }
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
      boughtOn: this.state.boughtOn,
      price: this.state.price
    }

    api.postItem(data)
      .then(result => {
        console.log('SUCCESS!')
        console.log('RESULT -->', result)
        let path = `/closet/item/${result.item._id}`
        this.props.history.push(path)
      })
      .catch(err => console.log('ERROR', err))
  }

  render() {
    const seasons = ["Spring", "Summer", "Autumn", "Winter"]
    const colors = ["Black", "White", "Grey", "Red", "Pink", "Orange", "Yellow", "Purple", "Blue", "Green", "Brown", "Mixed", "Metallic"]
    return (
      <div className="AddItem">
        <h1>A new Darling</h1>
        <p>Got your hands on something pretty? Make an addition to your closet!</p>

        <form onSubmit={this.handleSubmit} encType="multipart/form-data">

          <div className="filter-section file-upload">
            <button className={this.state.uploaded ? "butt active" : "butt"}>Upload a picture</button>
            <input type="file" name="picture" onChange={this.handleFileUpload} />
          </div>

          <p>Category</p>
          <div className="filter-section">
            {this.state.categories.map((category, i) => (
              <button onClick={e => this.handleRequiredClick(e, category)} key={i} className={this.state._category === category ? "active butt" : "butt"}>{category.name}</button>
            ))}
          </div>

          {this.state._category &&
            <div className="filter-section">
              {this.state._category.subcategories.map((subcategory, i) => (
                <button name="subcategory" onClick={e => this.handleOptionalClick(e, subcategory)} key={i} className={this.state.subcategory === subcategory ? "active butt" : "butt"}>{subcategory}</button>
              ))}
            </div>
          }

          <p>Season</p>
          <div className="filter-section">
            {seasons.map((season, i) => (
              <button name="season" onClick={e => this.handleOptionalClick(e, season)} key={i} className={this.state.season === season ? "active butt" : "butt"}>{season}</button>
            ))}
          </div>

          <p>Color</p>
          <div className="filter-section">
            {colors.map((color, i) => (
              <button name="color" onClick={e => this.handleOptionalClick(e, color)} key={i} className={this.state.color === color ? "active butt" : "butt " + color}>{color}</button>
            ))}
          </div>

          <p>Tags</p>
          <textarea name="tags" value={this.state.tags} onChange={this.handleInputChange} onKeyDown={this.handleHashtag} />
          <p>Brand</p>
          <input type="text" name="brand" value={this.state.brand} onChange={this.handleInputChange} />

          <div className="numbers">
            <div>
              <p>Bought On</p>
              <input type="date" name="boughtOn" value={this.state.boughtOn} onChange={this.handleInputChange} />
            </div>
            <div>
              <p>Price</p>
              <input type="number" name="price" min="0" value={this.state.price} onChange={this.handleInputChange} />
            </div>
          </div>

          <button className="butt" type="submit">Add New Item</button>
        </form>

        <Link to="/closet">
          <img className="adder" src={back} alt="back" />
        </Link>

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