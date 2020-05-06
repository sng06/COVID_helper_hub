const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postingsSchema = new Schema(
  {
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    postalCode: { type: String },
    phoneNumber: { type: String },
    gender: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

// const Posting = mongoose.model("Posting", postingsSchema);

// module.exports = { Posting };

module.exports = mongoose.model("Posting", postingsSchema);
