const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({

  username: {
    type: String,
  },
  fullname: {
    type: String,
  },
 
  carbon_goal: {
    type: String,
  },
  my_total_token_amount: {
    type: Number,
  },
  my_token_amount_sold: {
    type: Number,
  },
  my_current_token_amount: {
    type: Number,
  },
});

ProjectSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Project", ProjectSchema);
