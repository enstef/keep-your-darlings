import React, { Component } from 'react';
import api from '../../api';
import { Image, Transformation } from 'cloudinary-react';
import moment from "moment"

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: {}
    }
  }

  componentDidMount() {
    api.getHistory()
      .then(result => {
        this.setState({
          history: result
        })
      })
  }
  render() {
    return (
      <div className="History">
        <h1>Discover your past combinations!</h1>
        <p>Be original, don't wear the same things over and over again. It might be time to try out something new!</p>
        {this.state.history && Object.keys(this.state.history).map((ootd, i) => (
          <div className="herstory" key={i}>
            <p className="date">{moment(ootd).format("D.MM.YYYY")}</p>
            <div className="combination">
              {this.state.history[ootd].items.map((item, i) => {
                const publicId = item.pictureUrl.substring(item.pictureUrl.indexOf("darling-pics/"))
                return (
                  <div className="img-wrap" key={i}>
                    <Image cloudName="dbsepqxws" publicId={publicId}>
                      <Transformation width="300" gravity="auto:0" crop="fill" effect="art:fes" />
                    </Image>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

      </div>
    )
  }
}
export default History;