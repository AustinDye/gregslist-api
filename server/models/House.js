import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema({
  bathrooms: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  levels: { type: Number, required: true },
  imgUrl: { type: String },
  year: { type: Number, max: 2024 },
  price: { type: Number },
  description: { type: String },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
},
{ timestamps: true, toJSON: { virtuals: true } })

HouseSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
