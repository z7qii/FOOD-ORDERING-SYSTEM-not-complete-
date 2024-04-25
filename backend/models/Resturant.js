import mongoose from "mongoose";

const resturantSchema = mongoose.Schema({
  ownerEmail: {
    type: String,
    require: true,
  },
  resturantName: {
    type: String,
    require: true,
  },
  shortDescription: {
    type: String,
    require: true,
  },
  longDescription: {
    type: String,
    require: true,
  },
  backgroundImg: {
    type: String,
    require: true,
  },
  resturantImg: {
    type: String,
    require: true,
  },
  minOrder: {
    type: String,
    require: true,
  },
  deliveryTime: {
    type: String,
    require: true,
  },
  openTime: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  menu: {
    type: Map,
    default: new Map(),
  },
});

const resturant = mongoose.model("resturant", resturantSchema);

export default resturant;
