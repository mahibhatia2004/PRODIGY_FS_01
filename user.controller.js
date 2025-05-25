import { asyncHandler } from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    email.trim() === "" ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    throw new ApiError(400, "All fields are required");
  }

  ///TODO: TASK01 comment the reason
  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const createdUser = await User.create({
    username: username,
    password: password,
    email: email,
  });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Resgisterd Successfully"));
});

// req -> body -> json(data)
// req -> params -> uri/url/api-> ..../userId=ejeijio

///TODO create login controller