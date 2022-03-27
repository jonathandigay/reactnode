const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    activity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("activities", activitySchema);
