const { model, Schema } = require("mongoose");

const MovieSchema = new Schema(
  {
    title: { type: String, require: true },
    genre: { type: String, require: true },
    releaseDate: { type: Date, require: true },
    posterImage: { type: String, require: true },
    reviews: [ReviewSchema],
    numReviews: { type: Number, require: true, default: 0 },
    rating: { type: Number, require: true, default: 0 },
  },

  { timestamps: true }
);

module.exports = model("Movie", MovieSchema);
