import {InferSchemaType, model, Schema} from 'mongoose';

let msgSchema = new Schema({
  //article   ID
  article: {type: Schema.Types.ObjectId, ref: "article"},
  //内容
  msg: {type: String},

  //评论的时间
  time: {type: Number, default: Date.now},

  //留言者的id
  user: {type: Schema.Types.ObjectId, ref: "user"},

  //子评论
  children: [
    {
      msg: String,
      user: {type: Schema.Types.ObjectId, ref: "user"},
      reply: {type: Schema.Types.ObjectId, ref: "user"},
      time: {type: Number, default: Date.now},
    }
  ]
})
type Message = InferSchemaType<typeof msgSchema>
export const msgDB = model<Message>('message', msgSchema)

