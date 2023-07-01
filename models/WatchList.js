const { model, Schema } = require("mongoose");

const WatchListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],

  // create relations in here and in the other model
});

module.exports = model("WatchList", WatchListSchema);
