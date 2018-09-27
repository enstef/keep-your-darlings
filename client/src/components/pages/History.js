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

      <div className="History">
        <h1>Slide to discover your past combinations!</h1>
        <p>Be original, don't wear the same things over and over again. It might be time to try out something new!</p>
        <Link to="/profile">
          <Button className="profiler">Back</Button>
        </Link>



        <div className="History">
          {this.state.history && Object.keys(this.state.history)
            .sort((a, b) => a < b ? 1 : -1)
            .map((ootd, index) => (
              <div key={index}>

                <h1>{ootd}</h1>

                <div>
                  <div className="herstory"  >
                    {this.state.history[ootd].items.map((item, i) => (

                      <img key={i} src={item.pictureUrl} alt="" style={{ width: "80px", height: "80px", marginRight: "15px" }} />
                    ))
                    }
                  </div>
                </div>

              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
export default History;