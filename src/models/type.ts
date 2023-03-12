import { ObjectId, SchemaDefinitionProperty } from 'mongoose'

export interface IUser {
  _id: ObjectId
  profile?: {
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
    address: string
    phoneNumber: string
    age: number
    dob: string
  }
}

export interface IUserProfile {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  picture: string
  address: IAddress
  age: number
  dob: string
}

export interface IAddress {
  street1: string
  street2: string
  city: string
  state: string
  country: string
  zip: string
  location?: ILocation
}

export interface ILocation {
  type: IPoint
}

export interface IPoint {
  type: string
  coordinates: [number]
}

export interface ICar {
  licensePlateNumber: string
  carModel: string
  default: boolean
  userId: SchemaDefinitionProperty<ObjectId>
  // userId: Types.ObjectId
}
