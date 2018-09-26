import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import api from '../../api'
import { Image, Transformation } from 'cloudinary-react';
import back from "../../images/back.svg"
import CalendarHeatmap from "react-calendar-heatmap"
import 'react-calendar-heatmap/dist/styles.css';

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

          <CalendarHeatmap
            startDate={Date.now() - 365}
            endDate={Date.now()}
            values={this.state.item.wornOn}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
          />

          <button onClick={this.initiateDelete}>Delete</button>

          <div className={this.state.danger ? null : "hidden"}>
            <p>Do you really want to say Goodbye to your darling?</p>
            <button onClick={this.handleDelete}>Farewell</button>
            <button onClick={this.dismissDelete}>No I keep it!</button>
          </div>

          <Link to="/closet">
            <img className="adder" src={back} alt="back" />
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