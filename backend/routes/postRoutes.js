import express from 'express'
const router = express.Router()
import {
  getPosts,
  createPost,
  updatePost,
  getPostById,
  deletePost,
} from '../controllers/postController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getPosts).post(protect, admin, createPost)
router
  .route('/:id')
  .get(getPostById)
  .delete(protect, admin, deletePost)
  .put(protect, admin, updatePost)

export default router
