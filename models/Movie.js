const { model, Schema } = require("mongoose");

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    posterImage: { type: String, required: true },
    // reviews: [ReviewSchema],
    numReviews: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },

  { timestamps: true }
);

module.exports = model("Movie", MovieSchema);
