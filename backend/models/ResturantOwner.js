import mongoose from "mongoose";

const resturantOwnerSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
});

const resturantOwner = mongoose.model("resturantOwner", resturantOwnerSchema);

export default resturantOwner;
