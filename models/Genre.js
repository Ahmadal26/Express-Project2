const { model, Schema } = require("mongoose");
const { array } = require("../middlewares/uploader");

const GenreSchema = new Schema({
  type: array,
  items: String,
  enum: [
    Action,
    Adventure,
    Animation,
    Biography,
    Comedy,
    Crime,
    Documentry,
    Drama,
    Family,
    Fantasy,
    Film - Noir,
    History,
    Horror,
    Music,
    Musical,
    Mystery,
    Romance,
    Sci - Fi,
    Short,
    Sport,
    Thriller,
    War,
    Western,
  ],
});

module.exports = model("Genre", MovieSchema);
