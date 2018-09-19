import React, { Component } from 'react';
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from '../../api';
// import './AddItem.css';


class AddItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      tags: "",
      category: {},
      season: "",
      color: "null",
      boughtOn: "",
      price: 0,
      wornOn: ""

    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {}
    newState[stateFieldName] = event.target.value

    this.setState(newState)
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.name, this.state.tags)
    let data = {
      name: this.state.name,
      tags: this.state.tags,
      category: this.state.category,
      season: this.state.season,
      color: this.state.color,
      boughtOn: this.state.boughtOn,
      price: this.state.price,
      wornOn: this.state.wornOn
    }
    api.postItems(data)
      .then(result => {
        console.log('SUCCESS!')
        this.setState({
          name: "",
          tags: "",
          category: "",
          season: "",
          color: "",
          boughtOn: "",
          price: "",
          wornOn: "",
          message: `Your item '${this.state.name}' has been created`
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 2000)
      })
      .catch(err => {
        console.log('ERROR')
      })
  }
  render() {
    return (
      <div className="AddItem">
        <h2>Add item</h2>
        <form>
          Name: <input type="text" value={this.state.name} onChange={(e) => { this.handleInputChange("name", e) }} /> <br />
          tags: <input type="text" value={this.state.tags} onChange={(e) => { this.handleInputChange("tags", e) }} /> <br />
          category: <input type="number" value={this.state.category} onChange={(e) => { this.handleInputChange("category", e) }} /> <br />
          Description: <textarea value={this.state.description} cols="30" rows="10" onChange={(e) => { this.handleInputChange("description", e) }} ></textarea> <br />
          <button onClick={(e) => this.handleClick(e)}>Create item</button>
        </form>
        <div style={{
          margin: 10,
          backgroundColor: "red",
          display: this.state.message ? "block" : "none"
        }}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default AddItem;
