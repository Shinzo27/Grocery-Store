import express from 'express'
import { adminSignin, getUserDetails, logout, userSignin, userSignUp } from '../Controller/Users.js'
import { isCustomerAuthenticated } from '../Middleware/Auth.js'

const router = express.Router()

router.post('/signin', userSignin)
router.post('/signup', userSignUp)
router.get('/customer/me', isCustomerAuthenticated, getUserDetails)
router.get('/customer/logout', logout)
router.post('/admin/signin', adminSignin)

export default router