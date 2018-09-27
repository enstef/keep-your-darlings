import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import AddOutfit from "./AddOutfit";
import api from '../../api';


class Ootd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outfit: [],
      showComponent: false,
      wornOn: ""
    }
    this._onAddOOTDClick = this._onAddOOTDClick.bind(this);
    this.handleAddOutfit = this.handleAddOutfit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _onAddOOTDClick(e) {
    this.setState({
      showComponent: true,
    });
  }

  handleDate(e) {
    this.setState({
      wornOn: e.target.value
    })
  }

  handleAddOutfit(e, item) {
    console.log("handleAddOutfit", item, this.state.outfit);

    // If item is already in the this.state.outfit
    if (this.state.outfit.some(curItem => curItem._id === item._id)) {
      console.log("true");
      this.setState({
        outfit: this.state.outfit.filter(curItem => curItem._id !== item._id)
      })
    } else {
      console.log("false");
      this.setState({
        outfit: [...this.state.outfit, item]
      })
    }
  }

  //e.target.element.class = "selectedOutfit"      OR in <ItemCard className={this.state._category === category ? "active" : null}/>

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
      <div className="Ootd">
        <h1>OOTD</h1>
        <p>What are you wearing today Darling? Keep track and try out new combinations from time to time.
          Life is to short to be boring, be daring instead!</p>
        <p>Date: <input type="date" name="ootdDate" value={this.state.wornOn} onChange={this.handleDate.bind(this)} /></p>
        <div className="outfit">
          {this.state.outfit.map((item, i) => (
            <div key={i}>
              {/* <h5>{item.name}</h5> */}
              < img src={item.pictureUrl} alt="pic" height="70" width="70" />
              {/* <Image cloudName="niconek" publicId={publicId}>
              <Transformation width="500" gravity="auto:0" crop="fill" effect="art:fes" />
            </Image> */}
            </div>
          ))}
        </div>
        <Link to="/closet">
          <Button onClick={this.handleSubmit} className="postOutfit">Thats my outfit for today!</Button>
        </Link>



        <Button onClick={this._onAddOOTDClick} className="adder">Dive in</Button>

        {this.state.showComponent && <AddOutfit onAdd={this.handleAddOutfit} />}
      </div>
    );
  }
}


// componentDidMount(){
//   api.postOutfit(this.state.outfit.postId)
//     // .then((data) => {
//     //   this.setState(state => {
//     //     state.outfit = data;
//     //     return state;
//     //   });
//     // })
//     .then(data => {
//       this.setState({
//         outfit: data
//       })
//     })
//     .catch((err) => {
//       console.error('err', err);
//     });
// }


export default Ootd;
