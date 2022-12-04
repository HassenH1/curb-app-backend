import mongoose from "mongoose";
const { Schema } = mongoose;

const userProfileSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    // password: { type: String, select: false },
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    age: Number,
    dob: String,
    picture: String,
  },
  { _id: false }
);

const userCarSchema = new Schema(
  {
    licensePlateNumber: String,
    carModel: String,
    default: Boolean,
  },
  { _id: false }
);

const userSchema = new Schema({
  profile: userProfileSchema,
  cars: [userCarSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
