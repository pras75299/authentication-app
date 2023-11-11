import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tc: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
