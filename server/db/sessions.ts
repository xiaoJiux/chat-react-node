import {InferSchemaType, model, Schema} from 'mongoose';

let sessionSchema = new Schema({
  clearAt: {
    type: Date,
    default: Date.now(),
    index: {
      expires: `${60 * 60 * 24 * 7} `
    }
  }
})
type  Session = InferSchemaType<typeof sessionSchema>

export const sessionDB = model<Session>('sessions', sessionSchema)

export {}
