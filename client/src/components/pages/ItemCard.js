import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';

class ItemCard extends Component {

  // handleOutfitClick(e, value) {
  //   console.log(this.state[e.target.name])
  //   e.preventDefault()
  //   if (this.state[e.target.name] === value) {
  //     this.setState({
  //       [e.target.name]: ""
  //     })
  //   }
  //   else {
  //     this.setState({
  //       [e.target.name]: value
  //     })
  //   }
  // }
  // onClick(this.props.handleOutfit) {
  //   //This would give you all the field of the target
  //   console.log(e.target.elements);
  //   // you can do all sorts of Css change by this way
  //   e.target.element.class = "newGreenColor";
  // }
  // /*
  // var SampleApp = React.createClass({
  //  getInitialState: function () {
  //     return { toggle: false };
  //   },
  // */

  render() {
    const publicId = this.props.item.pictureUrl.substring(this.props.item.pictureUrl.indexOf("darling-pics/"))
    return (
      <div className="ItemCard">
        <Image cloudName="dbsepqxws" publicId={publicId} onClick={(e) => this.props.handleOutfit(this.props.item._id)}>
          <Transformation width="500" gravity="auto:0" crop="fill" effect="art:fes" />
        </Image>
      </div>
    );
  }
}

export default ItemCard;
