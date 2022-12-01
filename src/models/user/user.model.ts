import mongoose from "mongoose";
const { Schema } = mongoose;

const userProfileSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String, select: false },
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  address: String,
  phoneNumber: String,
  age: Number,
  dob: String,
  picture: String,
  car: String, //might need to go in its own schema
});

const userSchema = new Schema({
  profile: userProfileSchema,
});

const User = mongoose.model("User", userSchema);

export default User;
