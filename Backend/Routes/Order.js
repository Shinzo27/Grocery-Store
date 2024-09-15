import express from 'express'
import { checkout, completePayment, getOrders, verifyPayment } from '../Controller/Order.js'

const router = express.Router()

router.post('/createOrder', checkout)
router.post('/verifyPayment', verifyPayment)
router.post('/complete', completePayment)
router.get('/allOrders', getOrders)

export default router