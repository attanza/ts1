import mongoose, { Schema } from 'mongoose'

import { Shop } from './shop'

const ShopSchema: Schema = new Schema(
  {
    name: String,
    category: String,
    address: String,
    image: String,
    location: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
)
ShopSchema.index({ location: '2dsphere' })

const ShopModel = mongoose.model<Shop>('Shop', ShopSchema)

export default ShopModel
