import express from 'express'
import { addProduct, categoryProduct, getAllProducts, getProduct } from '../Controller/Products.js'
import { isAdminAuthenticated } from '../Middleware/Auth.js'

const router = express.Router()

router.post('/addProduct', addProduct)
router.get('/filterProduct', getProduct)
router.get('/categoryProduct', categoryProduct)
router.get('/allProducts', getAllProducts)

export default router