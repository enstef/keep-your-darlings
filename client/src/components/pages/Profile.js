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
      "'One is never over-dressed or under-dressed with a Little Black Dress.' \n - Karl Lagerfeld",
      "'I like my money right where I can see it…hanging in my closet.' \n — Carrie Bradshaw",
      "'Fashion is about dressing according to what’s fashionable. Style is more about being yourself.' \n — Oscar de la Renta",
      "'I don't design clothes. I design dreams.' \n — Ralph Lauren",
      "'Fashions fade, style is eternal.' \n — Yves Saint Laurent",
      "'Clothes mean nothing until someone lives in them.' \n — Marc Jacobs",
      "'People will stare. Make it worth their while.' \n — Harry Winston",
      "'In order to be irreplaceable one must always be different.' \n — Coco Chanel",
      "'Fashion is like eating, you shouldn't stick to the same menu.' \n — Kenzo Takada",
      "'When you don't dress like everybody else, you don't have to think like everybody else.' \n – Iris Apfel",
      "'If I’d observed all the rules, I’d never have got anywhere.' \n – Marilyn Monroe",
      "'Happiness is the secret to all beauty. There is no beauty without happiness.' \n – Christian Dior"
    ]
    let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
    return (
      <div className="Profile onepage">
        <h1>{this.state.user.username}'s closet</h1>
        <p className="random">{randomPhrase.split('\n').map((phrase, key) => {
          return <span key={key}>{phrase}<br /></span>
        })}</p>

        <Link className="standard-link" to="/ootd">OOTD</Link>
        <Link className="standard-link" to="/closet">Closet</Link>
        <Link className="standard-link" to="/history">Outfit History</Link>

        <div className="favorites">
          <div>
            <p>Your top Darling</p>
            {this.state.items.sort((a, b) => b.wornOn.length - a.wornOn.length).slice(0, 1).map((item, i) => (
              <Link className="" to={`/closet/item/${item._id}`} key={i}><ItemCard item={item} /></Link>
            ))}
          </div>
          <div>
            <p>Don't forget about this!</p>
            {this.state.items.sort((a, b) => a.wornOn.length - b.wornOn.length).slice(0, 1).map((item, i) => (
              <Link className="" to={`/closet/item/${item._id}`} key={i}><ItemCard item={item} /></Link>
            ))}
          </div>
        </div>

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
