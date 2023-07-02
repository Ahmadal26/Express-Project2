const { model, Schema } = require("mongoose");
const ReviewSchema = new Schema(
  {
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    movie: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Review", ReviewSchema);
