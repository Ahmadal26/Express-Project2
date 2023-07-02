const { model, Schema } = require("mongoose");

const SearchSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    actors: [{ type: Schema.Types.ObjectId, ref: "Actor" }],
  },

  { timestamps: true }
);

module.exports = model("Search", SearchSchema);
