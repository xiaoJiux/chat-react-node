import {InferSchemaType, model, Schema} from 'mongoose';

let chartSchema = new Schema({
  from: {type: Schema.Types.ObjectId, ref: 'user'},//消息来自
  to: {type: Schema.Types.ObjectId, ref: 'user'},//消息去哪
  chartList: [{
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    msg: {type: String}
  }]
})
type  Chart = InferSchemaType<typeof chartSchema>

export const chartDB = model<Chart>('charts', chartSchema)

export {}
