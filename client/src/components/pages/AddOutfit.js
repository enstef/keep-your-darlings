import React, { Component } from 'react';
import { Link } from "react-router-dom"
import api from '../../api';

import ItemCard from "./ItemCard"

class SelectOutfit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      //
      textsearch: "",
      category: "",
      subcategory: "",
      season: "",
      color: "",
      tags: "",
      brand: "",
      //
      activeIndex: 0
    }
    //this.handleTextsearch = this.handleTextsearch.bind(this)
    //this.handleSelect = this.handleSelect.bind(this)

    // this.outfitCardSelected = this.outfitCardSelected.bind(this);
  }


  render() {
    return (
      // const seasons = ["Spring", "Summer", "Autmn", "Winter"]
      // const colors = ["Black", "White", "Grey", "Red", "Pink", "Yellow", "Blue", "Green", "Brown", "Mixed", "Metallic"]
      // const brands = [...new Set(this.state.items.map(item => item.brand))]
      <div className="Closet">

        <p>Select the darlings you are wearing today. <br />
          Choose wisely.</p>
        <div className="item-list">
          {this.state.items.map(item => (
            <button onClick={e => this.props.onAdd(e, item)}>
              <ItemCard key={item._id} item={item} />
            </button>
          ))}
        </div>

        <Link to="/profile">
          <button className="adder"> back </button>
        </Link>
      </div>
    );
  };
  // className={this.state._category === category ?
  //    "active" : null}
  componentDidMount() {
    api.getCloset()
      .then(items => {
        this.setState({
          items: items,
          untouchedItems: items
        })
      })
      .catch(err => console.log(err))

    api.getCategories()
      .then(categories => {
        this.setState({
          categories: categories
        })
      })
      .catch(err => console.log(err))
  }
}

export default SelectOutfit;

  /*
  // /src/containers/blogPosts/update.js
  
  import React from 'react';
  import Form from '../../components/form';
import {fetchBlogPost, updateBlogPost } from '../../actions/blogPostActions';
        
const Update = React.createClass ({

          getInitialState() {
        return {
          blogPost: {}
        };
    },

    componentDidMount() {
          fetchBlogPost(this.props.params.postId)
            .then((data) => {
              this.setState(state => {
                state.blogPost = data;
                return state;
              });
            })
            .catch((err) => {
              console.error('err', err);
            });
        },
    
    handleSubmit(data) {
          updateBlogPost(this.state.blogPost.id, data);
        },
    
    render() {
        return (
            <div>
          <Form onSubmit={this.handleSubmit}
            title={this.state.blogPost.title}
            body={this.state.blogPost.body}></Form>
        </div>
        );
    }
});

export default Update;
*/