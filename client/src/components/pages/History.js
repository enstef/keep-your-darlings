import React, { Component } from 'react';
import api from '../../api';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

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
      <div className="History onepage">
        <h1>Slide to discover your past combinations!</h1>
        <p>Be original, don't wear the same things over and over again. It might be time to try out something new!</p>


        <Link to="/profile">
          <Button className="profiler">Back</Button>
        </Link>


        <div className="History">
          {this.state.history && Object.keys(this.state.history).map(ootd => (
            <div className="herstorypic">
              <h1>{ootd}</h1>
              {
                this.state.history[ootd].items.map((item, i) => (
                  <div key={i}>
                    <img src={item.pictureUrl} alt="" style={{ width: "80px", marginRight: "15px" }} />
                  </div>
                ))
              }
            </div>
          ))
          }
        </div>
      </div>
    );
  }
}
export default History;