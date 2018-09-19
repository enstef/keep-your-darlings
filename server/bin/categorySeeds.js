const mongoose = require("mongoose");
const Category = require("../models/Category");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let categories = [
  {
    name: "clothing",
    subcategories: ["",]
  },
]

Category.create(categories)
.then(categoriesCreated => {
  console.log(`${categoriesCreated.length} categories created`);
})
.then(() => {
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})


// subcatergory: 
//   tops: {
//     type: boolean,
//     specific: {
//       jacket: boolean,
//       blazer: boolean,
//       pullover: boolean,
//       shirt: boolean,
//       top: boolean,
//     }
//   },
//   pants: {
//     jeans: boolean,
//     capris: boolean,
//     shorts: boolean,
//     leggins: boolean,
//     skirt: boolean,
//   },
//   dress: boolean,
//   overall: boolean,
//   lingerie: boolean,
//   active: {
//     swimwear: boolean,
//     sportswear: boolean,
//   }
// }
// },
// shoes = {
// type: boolean,
// required: true,
// kind: {
//   sneakers: boolean,
//   espandrilles: boolean,
//   kneehighboots: boolean,
//   mules: boolean,
//   loafers: boolean,
//   boots: boolean,
//   pumps: boolean,
//   highheels: boolean,
//   ankleboots: boolean,
//   chelseaboots: boolean,
//   brougues: boolean,
//   sandals: boolean,
//   flats: boolean,
//   slippers: boolean,
//   laceups: boolean,
//   wedges: boolean,
//   ballerinas: boolean,
// }
// },