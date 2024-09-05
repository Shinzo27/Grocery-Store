import express from 'express'
import { isCustomerAuthenticated } from '../Middleware/Auth.js'
import { addToCart, displayItems, increaseQuantity, reduceQuantity, removeCartItem } from '../Controller/Cart.js'

const router = express.Router()

router.get('/display', isCustomerAuthenticated, displayItems)
router.post('/addToCart/:id', isCustomerAuthenticated, addToCart)
router.put('/increaseQuantity/:id', isCustomerAuthenticated, increaseQuantity)
router.put('/reduceQuantity/:id', isCustomerAuthenticated, reduceQuantity)
router.delete('/removeItem/:id', isCustomerAuthenticated, removeCartItem)

export default router