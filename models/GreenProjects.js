const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GreenProjectsSchema = new Schema({
  project_name: {
    type: String,
  },
  username: {
    type: String,
  },
  admin_name: {
    type: String,
  },
  admin_email: {
    type: String,
  },
  about_your_project: {
    type: String,
  },
  my_total_token_amount: {
    type: String,
  },
  my_token_amount_withdrawn: {
    type: String,
  },
  my_current_token_amount: {
    type: String,
  },
});

module.exports = mongoose.model("GreenProjects", GreenProjectsSchema);
