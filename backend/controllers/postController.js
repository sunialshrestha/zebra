import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'

//@desc Get all posts
//@route GET /api/posts
//@access Public
const getPosts = asyncHandler(async (req, res) => {
  const pageSize = 3
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Post.countDocuments({ ...keyword })
  const posts = await Post.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ posts, page, pages: Math.ceil(count / pageSize) })
})

//@desc create a post
//@route POST /api/posts
//@access Public/Admin
const createPost = asyncHandler(async (req, res) => {
  const { title, body, category, active } = req.body.post
  console.log(req.body)
  const post = new Post({
    title,
    body,
    user: req.user._id,
    category,
    active,
  })

  const createPost = await post.save()
  res.status(201).json(createPost)
})

//@desc Update a posts
//@route PUT /api/posts/:id
//@access Public/Admin
const updatePost = asyncHandler(async (req, res) => {
  const { title, body, category, active } = req.body

  const post = await Post.findById(req.params.id)

  if (post) {
    post.title = title
    post.body = body
    post.category = category
    post.active = active

    const updatedPost = await post.save()
    res.json(updatedPost)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

//@desc Fetch single post
//@route GET /api/posts/:id
//@access Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post) {
    res.json(post)
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

//@desc delete a posts
//@route DELETE /api/posts/:id
//@access Public/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post) {
    await post.remove()
    res.json({ message: 'Post removed' })
  } else {
    res.status(404)
    throw new Error('Post not found')
  }
})

export { getPosts, createPost, updatePost, getPostById, deletePost }
