const Genre = require("../../models/Genre");

// exports.getGenre = async (req, res, next) => {
//   try {
//     const temps = await User.find().select("-__v");
//     return res.status(200).json(temps);
//   } catch (error) {
//     return next(error);
//   }
// };

exports.genreCreate = async (req, res, next) => {
  try {
    const newGenre = await Genre.create(req.body);
    return res.status(201).json(newGenre);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: " Error: Can not create a new Genre", error });
  }
};
