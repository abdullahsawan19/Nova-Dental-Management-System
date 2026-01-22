const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    //   validate: {
    //     validator: function (value) {
    //       return validator.isStrongPassword(value, {
    //         minLength: 8,
    //         minLowercase: 1,
    //         minUppercase: 1,
    //         minNumbers: 1,
    //         minSymbols: 1,
    //       });
    //     },
    //   },
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    maxlength: 11,
  },
  role: {
    type: String,
    enum: ["doctor", "admin", "patient"],
    default: "patient",
  },
  preferredLanguage: {
    type: String,
    enum: ["ar", "en"],
    default: "en",
  },
  refreshToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

userSchema.pre(/^find/, function () {
  this.find({ isDeleted: false });
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
