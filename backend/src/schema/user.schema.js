const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
/**
 * @type {import('mongoose').Schema}
 */
const userSchema = mongoose.Schema(
  {
    username: { type: String, min: 2, max: 50, required: true, unique: true },
    password: { type: String, min: 8, max: 50, required: true },
    email: { type: String, min: 2, max: 50, required: true, unique: true },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;

  if (!this.isModified("password")) return next();
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

const User = mongoose.model("User", userSchema);

module.exports = User;
