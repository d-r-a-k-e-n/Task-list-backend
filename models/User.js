const mongoose = require("mongoose");
const {ObjectId} = require("mongodb");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: ObjectId,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
