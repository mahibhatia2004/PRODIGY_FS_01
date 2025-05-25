import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Password is must"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPassCorrect = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.methods.genereateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_SECRET_TOKEN,
    {
      expiresIn: process.env.ACCESS_Token_EXP,
    }
  );
};

userSchema.methods.genereateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_SECRET_TOKEN,
    {
      expiresIn: process.env.REFRESH_Token_EXP,
    }
  );
};

export const User = mongoose.model("User", userSchema);

/*
1. Web Token 
  - a digital key for confirmation
  - commonly used in web applications 
  - securely share information in between

2. Access Token
  - let a user access specific parts of application
  - when you login the server provide you with an access token
  - short lived (15- 30mins) for security

3. Refresh Tokens
  - Get a new access token without logging in again
  - access token expires, then send refresh token to the server to get a new access token
  - Long-lived (hours, days).

JWT (Josn Web Token) --> used for user authentication and authorization
*/