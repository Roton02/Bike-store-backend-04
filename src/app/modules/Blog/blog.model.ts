import { model, Schema } from 'mongoose'
import IBlog from './blog.interface'

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'blog title is required '],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'blog content is required'],
      trim: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'user' },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const blog = model<IBlog>('blog', blogSchema)
