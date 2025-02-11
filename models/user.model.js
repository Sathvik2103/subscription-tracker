import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLenght: 2,
      maxlength: 32,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
      minLenght: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
