import mongoose from 'mongoose'
const { Schema } = mongoose

const Point = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

const userProfileSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    phoneNumber: String,
    picture: String,
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      country: String,
      zip: String,
      location: {
        type: Point,
        required: false,
      },
    },
    age: Number,
    dob: String,
  },
  { _id: false }
)

const userCarSchema = new Schema({
  licensePlateNumber: String,
  carModel: String,
  default: Boolean,
})

const userSchema = new Schema(
  {
    profile: userProfileSchema,
    cars: [userCarSchema],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
