import express from 'express'
import { checkout, completePayment, getOrders, getSingleOrder, updateOrderStatus, verifyPayment } from '../Controller/Order.js'

const router = express.Router()

router.post('/createOrder', checkout)
router.post('/verifyPayment', verifyPayment)
router.post('/complete', completePayment)
router.get('/allOrders', getOrders)
router.get('/singleOrder/:id', getSingleOrder)
router.put('/updateOrderStatus/:id', updateOrderStatus)

export default router