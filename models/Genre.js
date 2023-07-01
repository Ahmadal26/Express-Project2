const { model, Schema } = require("mongoose");
// const { array } = require("../middlewares/uploader");

const GenreSchema = new Schema({
  type: { type: String, unique: true, required: true },
  movies: [{ type: Schema.Types.ObjectId, required: true, ref: "Movie" }],
});

module.exports = model("Genre", GenreSchema);
