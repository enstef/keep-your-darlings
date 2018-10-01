import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';
import AddOutfit from "./AddOutfit";
import api from '../../api';
import moment from "moment"

import add from "../../images/add.svg"
import back from "../../images/back.svg"


class Ootd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outfit: [],
      showComponent: false,
      wornOn: moment().format("YYYY-MM-DD"),
      //
      right: false,
      left: "",
    }
    this.handleAddOutfit = this.handleAddOutfit.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.slideRight = this.slideRight.bind(this)
    this.slideLeft = this.slideLeft.bind(this)
  }

  slideRight(e) {
    this.setState({
      right: true,
      left: false
    })
  }
  slideLeft(e) {
    this.setState({
      right: false,
      left: true,
    })
  }

  handleDate(e) {
    this.setState({
      wornOn: e.target.value
    })
  }

  handleAddOutfit(e, item) {
    // If item is already in the this.state.outfit
    if (this.state.outfit.some(curItem => curItem._id === item._id)) {
      this.setState({
        outfit: this.state.outfit.filter(curItem => curItem._id !== item._id)
      })
    } else {
      this.setState({
        outfit: [...this.state.outfit, item]
      })
    }
  }

  handleSubmit() {
    this.state.outfit.map(item => {
      let date = { date: this.state.wornOn }
      api.createOutfit(item._id, date)
        .then(result => {
          console.log(result)
        })
    })
  }

  render() {
    return (

      <div className={this.state.right ? "scroll" : "onepage"}>
        <div className={this.state.right ? "Ootd slideRight" : "Ootd" && this.state.left ? "Ootd slideLeft" : "Ootd"}>

          <div className="left">
            <h1>OOTD</h1>
            <p>What are you wearing today, Darling? Keep track and try out new combinations from time to time.<br />
              Life is too short to be boring, be daring instead!</p>
            <p>Date<input type="date" value={this.state.wornOn} onChange={this.handleDate} /></p>

            <div className="outfit">
              {this.state.outfit.map((item, i) => {
                const publicId = item.pictureUrl.substring(item.pictureUrl.indexOf("darling-pics/"))
                return (
                  <div className="img-wrap" key={i}>
                    <Image cloudName="niconek" publicId={publicId}>
                      <Transformation width="150" gravity="auto:0" crop="fill" effect="art:fes" />
                    </Image>
                  </div>
                )
              })}
            </div>

            <Link to="/profile">
              <button className="butt" onClick={this.handleSubmit}>Thats my outfit for the day!</button>
            </Link>

            {this.state.right ? <a className="adder" onClick={this.slideLeft}><img src={back} alt="back" /></a> : <a className="adder" onClick={this.slideRight}><img src={add} alt="add" /></a>}

          </div>

          <div className="right">
            <AddOutfit onAdd={this.handleAddOutfit} />
          </div>

        </div>
      </div>
    )
  }
}

export default Ootd;
