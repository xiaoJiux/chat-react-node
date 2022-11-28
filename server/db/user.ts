// const mongoose = require('mongoose')
import {InferSchemaType, model, Schema} from 'mongoose';


let userSchema = new Schema({
  // _id: Types.ObjectId,
  username: {type: String, required: true},
  password: {type: String, required: true},
  tx: {type: String, default: '/tx/default.png'},
  regTime: {type: Date, default: Date.now()},
  sex: {type: String, default: '男'},
  level: {type: Number, default: 0},
  bgImg: {type: String, default: '/bgImg/default.jpeg'},
  admin: {type: Boolean, default: false},
  email: {type: String},
  introduce: {type: String},
  online: {type: Boolean, default: false}
})
type  User = InferSchemaType<typeof userSchema>

export const userDB = model<User>('user', userSchema)

export {}
