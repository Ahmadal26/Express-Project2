const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema(
  {
    rating: { type: Number },
    text: { type: String, required: true },
    movieId: { type: Schema.Types.ObjectId, ref: "Movie" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Review", ReviewSchema);
