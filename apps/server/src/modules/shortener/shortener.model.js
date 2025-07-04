import { Schema, model } from 'mongoose';

const ShortenerSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortUrl: {
      type: String,
      required: true,
      //   unique: true,
      trim: true,
    },
    accessCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ShortenerModel = model('Shortener', ShortenerSchema);
export default ShortenerModel;
