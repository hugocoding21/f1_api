const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Timer", TimerSchema);
