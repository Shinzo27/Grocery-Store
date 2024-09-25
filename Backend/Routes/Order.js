import express from 'express'
import { checkout, completePayment, getLastFiveOrders, getLessQuantityProducts, getOrders, getProductCategory, getSalesData, getSingleOrder, getStats, updateOrderStatus, verifyPayment } from '../Controller/Order.js'

const router = express.Router()

router.post('/createOrder', checkout)
router.post('/verifyPayment', verifyPayment)
router.post('/complete', completePayment)
router.get('/allOrders', getOrders)
router.get('/singleOrder/:id', getSingleOrder)
router.put('/updateOrderStatus/:id', updateOrderStatus)
router.get('/getStats', getStats)
router.get('/getSalesData', getSalesData)
router.get('/getProductCategory', getProductCategory)
router.get('/getLastFiveOrders', getLastFiveOrders)
router.get('/getLessQuantityProducts', getLessQuantityProducts)

export default router