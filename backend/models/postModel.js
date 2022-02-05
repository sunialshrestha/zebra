import mongoose from 'mongoose'

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
