const { model, Schema } = require("mongoose");

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    releaseDate: { type: Date, required: true },
    posterImage: { type: String, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    numReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
  },

  { timestamps: true }
);

module.exports = model("Movie", MovieSchema);
