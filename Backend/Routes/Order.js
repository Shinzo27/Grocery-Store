import express from 'express'
import { checkCartQuantity, checkout, clearNotification, completePayment, getLastFiveOrders, getLessQuantityProducts, getNotification, getOrders, getOrdersByUser, getProductCategory, getSalesData, getSingleOrder, getStats, updateOrderStatus, verifyPayment } from '../Controller/Order.js'
import { isCustomerAuthenticated } from '../Middleware/Auth.js'

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
router.get('/getNotification', getNotification)
router.delete('/clearNotification', clearNotification)
router.get('/getOrdersByUser', isCustomerAuthenticated, getOrdersByUser)
router.post('/checkCartQuantity', isCustomerAuthenticated, checkCartQuantity)

export default router