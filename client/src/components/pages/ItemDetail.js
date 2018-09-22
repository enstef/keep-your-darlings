import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import api from '../../api'

class ItemDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: "",
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete() {
    api.deleteItem()
    .then(result => {
      console.log('Deleted!')
      this.props.history.push("/closet")
    })
    .catch(err => {
      console.log('ERROR')
    })
  }

  render() {
    return (
      <div className="ItemDetail onepage">
        {/* <h1>Look, one of your Darlings!</h1> */}
        <div className="header">
          <img src={this.state.item.pictureUrl} alt="item"/>
        </div>
        <p>{this.state.item.tags}</p>
        <p>{this.state.item.season}</p>
        <p>{this.state.item.color}</p>
        <p>{this.state.item.boughtOn}</p>
        <p>{this.state.item.price}</p>
        <p>{this.state.item.wornOn}</p>
        {/* {this.state.item.wornOn && <p>Good Job wearing!</p>}
        {!this.state.item.wornOn && <p>Never worn yet!</p>} */}
        <button onClick={this.handleDelete}>Delete</button>
        <Link to="/closet">
          <button class="closeter">Back</button>
        </Link>
      </div>
    );
  }
  
  componentDidMount() {
    api.getItem(this.props.match.params._id)
      .then(item => {
        this.setState({
          item: item,
        })
      })
      .catch(err => console.log(err))
  }
}
export default ItemDetail;