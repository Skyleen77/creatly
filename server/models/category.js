import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: [true, 'Slug already exist'],
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Category', categorySchema);
