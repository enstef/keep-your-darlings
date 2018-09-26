import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'
import ItemCard from './ItemCard';

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
      "Don't be like the rest of them darling.",
      "Oh darling, go buy a personality.",
      "Darling, shine. That's all.",
      "Time will teach you why, darling.",
      "Darling, I'm a nightmare dressed like a daydream.",
      "Darling, a beautiful thing is never perfect.",
      "Life is tough, my darling, but so are you."
    ]
    let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    return (
      <div className="Profile onepage">
        <h1>{this.state.user.username}s closet</h1>
        <p className="random">{randomPhrase}</p>

        <p>Your top 3 Darlings</p>
        {this.state.items.sort((a, b) => b.wornOn.length - a.wornOn.length).slice(0, 3).map((item, i) => {
          <ItemCard item={item} key={i} />
        })}
        <p>Your least 3</p>
        {this.state.items.sort((a, b) => a.wornOn.length - b.wornOn.length).slice(0, 3).map((item, i) => {
          <ItemCard item={item} key={i} />
        })}
        <Link to="/ootd">OOTD</Link> <br />
        <Link to="/closet">Closet</Link>
        <h1 class="kyd">KYD</h1>
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
