import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, 'Name already exist'],
      required: [true, 'Name is required'],
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
