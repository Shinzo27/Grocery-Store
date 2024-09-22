import Razorpay from "razorpay";
import { instance } from "../index.js";
import ErrorHandler from "../Middleware/ErrorHandler.js";
import crypto from 'crypto'
import Cart from "../Models/Cart.js";
import Order from "../Models/Order.js";

export const checkout = async (req, res, next) => {
  const { amount } = req.body
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  if (!order) return new ErrorHandler("Something went wrong", 400);

  res.status(200).json({
    success: true,
    order,
  });
};

export const verifyPayment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userDetails } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  
  if (isAuthentic) {
    res.status(200).json({
      success: true
    })
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

export const completePayment = async(req,res,next) => {
  const { userDetails, razorpay_order_id, total } = req.body
  const userId = req.user.id
  const cartItems = await Cart.find({userId}).populate('productId')

  if(!cartItems.length) {
    return next(new ErrorHandler("No items in cart", 400))
  }

  const newOrder = await Order.create({
    user: userId,
    address: userDetails.address,
    city: userDetails.city,
    state: userDetails.state,
    pincode: userDetails.pincode,
    total: total,
    products: cartItems.map(item=>({
      name: item.productId.name,
      quantity: item.quantity,
      price: item.productId.price * item.quantity
    })),
    orderId: razorpay_order_id
  })
  const deleteItem = await Cart.deleteMany({ userId })

  if(deleteItem){
    return res.status(200).json({
      success: true
    })
  }
  else{
    return res.status(400).json({
      success: false
    })
  }
}


export const getOrders = async(req,res,next) => {
  const orders = await Order.find({});
  res.json({
    orders
  })
}

export const getSingleOrder = async(req,res,next) => {
  const order = await Order.findOne({orderId: req.params.id}).populate('products user');
  if(!order) return next(new ErrorHandler("Order not found", 400))

  res.json({
    order
  })
}

export const updateOrderStatus = async(req,res,next) => {
  const orderId = req.params.id;
  const status = req.body.status;
  const order = await Order.findByIdAndUpdate(orderId, {status});
  if(!order) return next(new ErrorHandler("Order not found", 400))

  res.json({
    success: true
  })
  console.log(status);
}