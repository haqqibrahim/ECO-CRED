const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullName: {
    type: String,
  },
  username: {
    type: String,
  },
  category: {
    type: String,
  },
  carbon_goal: {
    type: String,
  },
  my_total_token_amount: {
    type: String,
  },
  my_token_amount_sold: {
    type: String,
  },
  my_current_token_amount: {
    type: String,
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
