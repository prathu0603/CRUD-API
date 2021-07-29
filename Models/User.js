const mongoose = require("mongoose");

const CrudSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", CrudSchema);
