// import React, { Component } from 'react';
// import { Link } from "react-router-dom"
// import api from '../../api';

// import ItemCard from "./ItemCard"

// class SelectOutfit extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       categories: [],
//       //
//       textsearch: "",
//       category: "",
//       subcategory: "",
//       season: "",
//       color: "",
//       tags: "",
//       brand: "",
//       //
//       activeIndex: 0
//     }
//     this.filterHandler = this.filterHandler.bind(this);

//     this.outfitCardSelected = this.outfitCardSelected.bind(this);
//   }
// }
// // outfitCardSelected(e, item) {
// //   e.preventDefault()
// //   console.log('tapped', e.target.value);
// //   console.log('tapped', e.target.value)
// //   let selectedOutfit = e.target.value
// //   this.setState({
// //     selectedoutfit: [...item]
// //   })
// //   //e.target.element.class = "selectedOutfit"      OR in <ItemCard className={this.state._category === category ? "active" : null}/>
// // }
// render() {
//   return (
//     <div className="Closet">

//       <h2>My Closet</h2>
//       <div className="item-list">
//         {this.state.items.map((item, i) =>
//           <ItemCard key={i} item={item} onclick={e => this.outfitCardSelected(e, item)} />
//         )}
//       </div>

//       <Link to="/ootd">
//         <button className="adder">Add</button>
//       </Link>
//     </div>
//   );
// }


// /*
// <div>
//               {this.state.categories.map((category, i) => (
//                 <button name="_category" onClick={e => this.handleOptionalClick(e, category)} key={i} className={this.state._category === category ? "active" : null}>{category.name}</button>
//               ))}
//             </div>
// */

// componentDidMount() {

//   api.getCloset()
//     .then(items => {
//       this.setState({
//         items: items
//       })
//     })
//     .catch(err => console.log(err))

//   api.getCategories()
//     .then(categories => {
//       this.setState({
//         categories: categories
//       })
//     })
//     .catch(err => console.log(err))
// }
// }

// export default Closet;



// /*
// // /src/containers/blogPosts/update.js

// import React from 'react';
// import Form from '../../components/form';
// import { fetchBlogPost, updateBlogPost } from '../../actions/blogPostActions';

// const Update = React.createClass ({

//     getInitialState() {
//         return {
//             blogPost: {}
//         };
//     },

//     componentDidMount() {
//         fetchBlogPost(this.props.params.postId)
//             .then((data) => {
//                 this.setState(state => {
//                     state.blogPost = data;
//                     return state;
//                 });
//             })
//             .catch((err) => {
//                 console.error('err', err);
//             });
//     },

//     handleSubmit(data) {
//         updateBlogPost(this.state.blogPost.id, data);
//     },

//     render() {
//         return (
//             <div>
//                 <Form onSubmit={this.handleSubmit}
//                       title={this.state.blogPost.title}
//                       body={this.state.blogPost.body}></Form>
//             </div>
//         );
//     }
// });

// export default Update;
// */

// /*
// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.btnTapped = this.btnTapped.bind(this);
//   }
//   btnTapped() {
//     console.log('tapped');
//   }
//   render() {

//     return (
//       <div>
//         {
//           this.props.stations.map((station, index) => {
//         return <div key={index} onClick={this.btnTapped}>{station}</div>
//       })
//         }
//         </div>

//     )
//   }
// }

// var cards = ["amazon", "aeo", "aerie", "barnes", "bloomingdales", "bbw", "bestbuy", "regal", "cvs", "ebay", "gyft", "itunes", "jcp", "panera", "staples", "walmart", "target", "sephora", "walgreens", "starbucks"];

// ReactDOM.render(<Test stations={cards} />, document.getElementById('test-div'));
// */