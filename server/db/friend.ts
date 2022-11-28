// const mongoose = require('mongoose')
import {InferSchemaType, model, Schema} from 'mongoose';


let friendSchema = new Schema({
  // _id: Types.ObjectId,
  u_id: {type: Schema.Types.ObjectId, ref: "user"},
  // 好友id
  f_id: [{type: Schema.Types.ObjectId, ref: 'user'}]
})
type  Friend = InferSchemaType<typeof friendSchema>

export const friendDB = model<Friend>('friend', friendSchema)

export {}
