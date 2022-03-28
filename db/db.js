const mongoose = require("mongoose");

const dbconnect = () => {
  mongoose.connect(process.env.URI, () => {
    console.log("database connected!");
  });
};

module.exports = { dbconnect };
