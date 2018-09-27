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
      // "Don't be like the rest of them Darling.",
      // "Oh Darling, go buy a personality.",
      "Darling, shine. That's all.",
      // "Time will teach you why, Darling.",
      // "Darling, I'm a nightmare dressed like a daydream.",
      // "Darling, a beautiful thing is never perfect.",
      "Life is tough, my Darling, but so are you.",
      "'One is never over-dressed or under-dressed with a Little Black Dress.' - Karl Lagerfeld",
      "'I like my money right where I can see it…hanging in my closet.' — Carrie Bradshaw",
      "'Fashion is about dressing according to what’s fashionable. Style is more about being yourself.' — Oscar de la Renta",
      "'I don't design clothes. I design dreams.' — Ralph Lauren",
      "'Fashions fade, style is eternal.' — Yves Saint Laurent",
      "'Clothes mean nothing until someone lives in them.' —Marc Jacobs",
      "'People will stare. Make it worth their while.' — Harry Winston",
      "'In order to be irreplaceable one must always be different.' — Coco Chanel",
      "'Fashion is like eating, you shouldn't stick to the same menu.' — Kenzo Takada",
      "'When you don't dress like everybody else, you don't have to think like everybody else' - Iris Apfel",
      "'If I’d observed all the rules, I’d never have got anywhere.' - Marilyn Monroe",
      "'Happiness is the secret to all beauty. There is no beauty without happiness.' - Christian Dior"
    ]
    let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    return (
      <div className="Profile onepage">
        <h1>{this.state.user.username}'s closet</h1>
        <p className="random">{randomPhrase}</p>

        <p>Your top 3 Darlings</p>
        {this.state.items.sort((a, b) => b.wornOn.length - a.wornOn.length).slice(0, 3).map((item, i) => {
          <ItemCard item={item} key={i} />
        })}
        <p>Your least 3</p>
        {this.state.items.sort((a, b) => a.wornOn.length - b.wornOn.length).slice(0, 3).map((item, i) => {
          <ItemCard item={item} key={i} />
        })}

        <Link className="standard-link" to="/ootd">OOTD</Link> <br />
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
