import {InferSchemaType, model, Schema} from 'mongoose';

let articleSchema = new Schema({
  msg: {type: Schema.Types.ObjectId, ref: 'message'},
  //内容
  content: {type: String, required: true},
  //用户id
  user: {type: Schema.Types.ObjectId, ref: 'user', required: true},
  //动态图片
  img: {
    type: [{
      type: String
    }]
  },
  //发表时间
  time: {type: Date, default: Date.now()},
  //点赞
  likes: [
    {type: Schema.Types.ObjectId, ref: 'user'}
  ],
  //浏览量
  pageView: {type: Number, default: 0},

})

type Article = InferSchemaType<typeof articleSchema>
export const articleDB = model<Article>('article', articleSchema)
