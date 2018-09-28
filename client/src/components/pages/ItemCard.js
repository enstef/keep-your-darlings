import React, { Component } from 'react';
import { Image, Transformation } from 'cloudinary-react';

class ItemCard extends Component {
  render() {
    const publicId = this.props.item.pictureUrl.substring(this.props.item.pictureUrl.indexOf("darling-pics/"))
    return (

      <div className="ItemCard" >
        <Image cloudName="niconek" publicId={publicId}>
          <Transformation width="500" gravity="auto:0" crop="fill" effect="art:fes" />
        </Image>
      </ div >
    );
  }
}

export default ItemCard;
