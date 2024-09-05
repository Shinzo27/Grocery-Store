import express from 'express'
import { addCategory, getCategory } from '../Controller/Category.js'

const router = express.Router()

router.get('/getCategory', getCategory)
router.post('/addCategory', addCategory)

export default router