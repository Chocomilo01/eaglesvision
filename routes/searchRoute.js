// const express = require('express');
// const router = express.Router();
// const Customer = require('../model/customerModel')
// const app = express();



// app.get('/search/:key', async (req, res)=>{
//     let data = await Customer.find(

//     { 
//         "$or":[
//             {phone:{$regex:req.params.key}}
//         ]
//      }
//  )
//     res.send(data);
// })

// module.exports = router;

// const Rooms = require("../models/room");

// exports.getFilteredRooms = async (queries) => {
//   const { search, roomType, minPrice, maxPrice } = queries;

//   try {
//     /**
//      * Check if the search query isn't properly constructed
//      */
//     if (search === undefined) {
//       throw new Error(
//         "No search queries provided"
//       );
//     }

//     if (!queries === {}) {
//       throw new Error(
//         "No search queries provided. Try searching for rooms by name, price and type"
//       );
//     }

//     // let regex = '/^tagQuery/i';
//     // regex = regex.replace('tagQuery', roomSearchQuery);
//     // regex = new RegExp(regex);
//     // console.log(typeof regex, regex)
//     const matchedRooms = await Rooms.find(
//       {
//         $or: [
//           { name: { $regex: search, $options: "i" } },
//           { price: { "$gte": minPrice, "$lte": maxPrice } }
//         ],
//       },
//       undefined,
//       { populate: { path: "roomType", options: { strict: false } } }
//     )
//       .limit(10)
//       .lean();

//       return { data: matchedRooms };
//   } catch (err) {
//     throw err
//   }
// };
