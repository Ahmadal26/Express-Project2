const { model, Schema } = require("mongoose");
const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = model("Review", ReviewSchema);
