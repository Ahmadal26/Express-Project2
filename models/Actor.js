const { model, Schema } = require("mongoose");

const ActorSchema = new Schema({
  name: { type: String, unique: true, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

module.exports = model("Actor", ActorSchema);
