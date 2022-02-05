import express from 'express'
const router = express.Router()
import { ThroughDirectory } from '../controllers/browserController.js'

router.route('/').get(ThroughDirectory)
export default router
