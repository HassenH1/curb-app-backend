export interface IUser {
  _id: Types.ObjectId;
  profile?: {
    username?: string;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phoneNumber?: string;
    age?: number;
    dob?: string;
  };
  cars?: [];
}
