import express from 'express'
import { addProduct, categoryProduct, getAllProducts, getProduct, getSingleProduct, updateProduct } from '../Controller/Products.js'
import { isAdminAuthenticated } from '../Middleware/Auth.js'

const router = express.Router()

router.post('/addProduct', addProduct)
router.get('/filterProduct', getProduct)
router.get('/categoryProduct', categoryProduct)
router.get('/allProducts', getAllProducts)
router.get('/singleProduct/:id', getSingleProduct)
router.put('/updateProduct/:id', updateProduct)

export default router