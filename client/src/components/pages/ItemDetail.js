import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import api from '../../api'
import { Image, Transformation } from 'cloudinary-react';

class ItemDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: "",
      danger: false,
    }
    this.initiateDelete = this.initiateDelete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.dismissDelete = this.dismissDelete.bind(this)
  }

  initiateDelete(e) {
    this.setState({
      danger: true
    })
  }
  handleDelete(e) {
    api.deleteItem(this.props.match.params._id)
      .then(result => {
        console.log('Deleted!')
        this.props.history.push("/closet")
      })
      .catch(err => {
        console.log('ERROR')
      })
  }
  dismissDelete(e) {
    this.setState({
      danger: false,
    })
  }

  render() {
    if (!this.state.item) return <span>Loading…</span>
    else {
      const publicId = this.state.item.pictureUrl.substring(this.state.item.pictureUrl.indexOf("darling-pics/"))
      return (
        <div className="ItemDetail onepage">
          {/* <h1>Look, one of your Darlings!</h1> */}
          <div className="header">
            <Image cloudName="niconek" publicId={publicId} >
              <Transformation width="1000" gravity="auto:0" crop="fill" effect="art:fes" />
            </Image>
          </div>
          <p>{this.state.item.tags}</p>
          <p>{this.state.item.season}</p>
          <p>{this.state.item.color}</p>
          <p>{this.state.item.boughtOn}</p>
          <p>{this.state.item.price}</p>
          <p>worn: {this.state.item.wornOn}</p>

          {/* TODO: MAKE NICE INFOGRAPHICS */}

          <button onClick={this.initiateDelete}>Delete</button>

          <div className={this.state.danger ? null : "hidden"}>
            <p>Do you really want to say Goodbye to your darling?</p>
            <button onClick={this.handleDelete}>Farewell</button>
            <button onClick={this.dismissDelete}>No I keep it!</button>
          </div>

          <Link to="/closet">
            <button className="closeter">Back</button>
          </Link>
        </div>
      )
    }
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