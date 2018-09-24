import React, { Component } from 'react';
import { Button } from 'reactstrap';
import AddOutfit from "./AddOutfit";

class Ootd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      outfit: [],
      showComponent: false,
    }
    this._onAddOOTDClick = this._onAddOOTDClick.bind(this);
  }
  _onAddOOTDClick() {
    this.setState({
      showComponent: true,
    });
  }

  // handleOutfit(itemId) {
  //   if (this.state.outfit.includes(itemId)) {
  //     this.setState({
  //       outfit: this.state.outfit.filter(item => item !== itemId)
  //     })
  //   } else {
  //     this.setState({
  //       outfit: [...this.state.outfit, itemId]
  //     })
  //   }
  // }

  //e.target.element.class = "selectedOutfit"      OR in <ItemCard className={this.state._category === category ? "active" : null}/>


  // handleSubmit(data) {
  //   updateOutfit(this.state.outfit.id, data);
  // }
  render() {
    return (
      <div className="Ootd">
        <h1>OOTD</h1>
        <p>What are you wearing today Darling? Keep track and try out new combinations from time to time.<br />
          Life is to short to be boring, be daring instead!</p>
        {this.state.outfit.map(item => (
          <div><h5>{item}</h5></div>
        ))}

        <Button onClick={this._onAddOOTDClick} className="adder">Add</Button>
        {this.state.showComponent ?
          <AddOutfit handleOutfit={this.handleOutfit.bind(this)} /> :
          null
        }
      </div>
    );
  }
}


// componentDidMount(){
//   api.fetchOutfit(this.state.outfit.postId)
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

// componentDidMount() {

//   fetchBlogPost(this.props.params.postId)
//     .then((data) => {
//       this.setState(state => {
//         state.blogPost = data;
//         return state;
//       });
//     })
//     .catch((err) => {
//       console.error('err', err);
//     });
// }

export default Ootd;
