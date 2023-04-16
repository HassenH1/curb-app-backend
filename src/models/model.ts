import mongoose from 'mongoose';
import { ICar, IUser, IUserProfile, IPoint } from './type';

const { Schema } = mongoose;

const Point = new mongoose.Schema<IPoint>({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const userProfileSchema = new Schema<IUserProfile>(
  {
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
    emailVerified: { type: Boolean, default: false },
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
);

const carSchema = new Schema<ICar>({
  licensePlateNumber: String,
  carModel: String,
  default: Boolean,
  userId: { type: mongoose.Types.ObjectId, ref: 'User' },
});

const userSchema = new Schema<IUser>(
  {
    profile: userProfileSchema,
  },
  { timestamps: true }
);

const models = {
  Car: mongoose.model<ICar>('Car', carSchema),
  User: mongoose.model<IUser>('User', userSchema),
};

export default models;
