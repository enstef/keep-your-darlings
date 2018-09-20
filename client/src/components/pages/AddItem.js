import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import api from '../../api'

// import './AddItem.css';

class AddItem extends Component {
  constructor(props) {
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
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
  }

  handleFileUpload(e) {
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      picture: e.target.files[0]
    })
  }

  handleInputChange(e) {
    console.log(e.target.value)
    console.log(this.state._category.name)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleButtonClick(e, category) {
    e.preventDefault()
    this.setState({
      _category: category
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    let data = {
      name: this.state.name,
      tags: this.state.tags,
      _category: this.state._category._id,
      season: this.state.season,
      color: this.state.color,
      boughtOn: this.state.boughtOn,
      price: this.state.price,
      pictureUrl: this.state.pictureUrl
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

          Name:
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} required={true} /> <br />
          Tags:
          <textarea name="tags" value={this.state.tags} cols="30" rows="5" onChange={this.handleInputChange} /> <br />

          Category:
          <div>
            {this.state.categories.map((category, i) => (
              <button onClick={e => this.handleButtonClick(e, category)} key={i}>{category.name}</button>
            ))}
          </div>
          <br />

          {this.state._category &&
            <div>
              <p>Subcategories:</p>
              {this.state._category.subcategories.map((subcategory, i) => (
                <button key={i}>{subcategory}</button>
              ))}
            </div>
          }

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