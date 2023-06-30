const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, max: 25 },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String, required: true },
    isStaffMember: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);

//https://www.npmjs.com/package/multer
//https://mongoosejs.com/docs/schematypes.html
//https://www.bing.com/search?pglt=43&q=how+define+email+in+mongoose+model+schema&cvid=101c3d69856947708e9a905084db1e46&aqs=edge..69i57j0l8j69i11004.21580j0j1&FORM=ANNAB1&PC=HCTS
//https://www.bing.com/search?q=validate+email+in+mongoose+schema&cvid=ba6f24926ea14d69b11bf75f55cdb950&aqs=edge.3.69i64l4j69i64i450l4.138103j0j9&FORM=ANAB01&PC=HCTS
//https://stackoverflow.com/questions/59212143/what-is-the-proper-way-to-validate-email-uniqueness-with-mongoose
