const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
