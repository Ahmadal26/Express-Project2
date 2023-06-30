const { model, Schema } = require("mongoose");

const ActorSchema = new Schema({
  name: { type: String, required: true },
  movie: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Movie",
  },
});

module.exports = model("Movie", ActorSchema);
