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
          <div className="header">
            <Image cloudName="niconek" publicId={publicId} >
              <Transformation width="1000" gravity="auto:0" crop="fill" effect="art:fes" />
            </Image>
          </div>

          <div className="statistics">
            <CalendarHeatmap
              startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
              endDate={new Date()}
              values={this.state.item.wornOn.map(date => ({ date: date }))}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-scale-${value.count}`;
              }}
            />

            {/* <p>{this.state.item.season}</p>
            <p>{this.state.item.color}</p> */}
            <div className="cost">
              {this.state.item.boughtOn ? <p>Bought on {this.state.item.boughtOn} {this.state.item.price ? <p>for {this.state.item.price}€</p> : null}</p> : null}
              {this.state.item.price ? <p>Cost per wear: {Math.floor(this.state.item.price / this.state.item.wornOn.length)}€!</p> : null}
            </div>
            {this.state.item.tags ? <p className="tags">{this.state.item.tags}</p> : null}

            <button className="butt" onClick={this.initiateDelete}>Sort out…</button>
          </div>

          <div className={this.state.danger ? "delete-message" : "delete-message hidden"}>
            <p>Do you really want to say Goodbye to your darling?</p>
            <button className="butt" onClick={this.handleDelete}>Farewell</button>
            <button className="butt" onClick={this.dismissDelete}>No I keep it!</button>
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