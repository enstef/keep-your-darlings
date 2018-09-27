import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
// import ItemCard from './ItemCard';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      items: [],
    }
  }

  render() {
    const phrases = [
      "Darling, don't ever be too shy to dance your heart out.",
      "Don't be like the rest of them Darling.",
      "Oh Darling, go buy a personality.",
      "Darling, shine. That's all.",
      "Time will teach you why, Darling.",
      "Darling, I'm a nightmare dressed like a daydream.",
      "Darling, a beautiful thing is never perfect.",
      "Life is tough, my Darling, but so are you."
    ]
    let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    return (
      <div className="Profile onepage">
        <h1>{this.state.user.username}'s closet</h1>
        <p className="random">{randomPhrase}</p>

        {/* <p>Your top 3 Darlings</p>
        {this.state.items.sort((a, b) => b.wornOn.length - a.wornOn.length).slice(0, 3).map((item, i) => {
          <ItemCard item={item} key={i} />
        })}
        <p>Your least 3</p>
        {this.state.items.sort((a, b) => a.wornOn.length - b.wornOn.length).slice(0, 3).map((item, i) => {
          <ItemCard item={item} key={i} />
        })} */}
                                                                                            
        <Link className="standard-link" to="/ootd">OOTD</Link>
        <Link className="standard-link" to="/closet">Closet</Link>
        <Link className="standard-link" to="/history">Outfit History</Link>

      </div>
    );
  }

  componentDidMount() {
    api.getProfile()
      .then(user => {
        this.setState({
          user: user
        })
      })
    api.getCloset()
      .then(items => {
        this.setState({
          items: items
        })
      })
  }
}

export default Profile;
