import Cart from '../Models/Cart.js'
import ErrorHandler from "../Middleware/ErrorHandler.js";
import Product from '../Models/Products.js'

export const displayItems = async (req, res, next) => {
  const userId = req.user._id;
  
  const cartItems = await Cart.find({ userId }).populate(
    "productId",
    "imgUrl name price",
  );
  return res.status(200).json({
    cartItems,
  });
};

export const addToCart = async (req,res, next) => { 
  const productId = req.params.id;
    const userId = req.user._id;
    const { quantity } = req.body;
    if(!userId) return next(new ErrorHandler("User is not authenticated!", 400))

    if(!quantity) return next(new ErrorHandler("Enter quantity properly!", 400))
    
    const checkIfExist = await Cart.findOne({productId})

    if(checkIfExist) return next(new ErrorHandler("Product is already added in the cart!", 400))
    
    const prod = await Product.findOne({_id: productId})

    if(prod.quantity > quantity) {
      const price = prod.price
        var totalPrice = quantity * price;

        const insert = await Cart.create({
            userId,
            productId,
            quantity,
            totalPrice
        })

        if(insert) return res.status(200).json({
            success: true,
            message: "Product added to the cart successfully!"
        })
    } else {
        return next(new ErrorHandler("Not enough quantity!", 400))
    }
}

export const increaseQuantity = async(req,res,next)=>{
  const _id = req.params.id;

  const cartProduct = await Cart.findOne({_id})
  const productId = cartProduct.productId
  const prod = await Product.findOne({_id: productId})

  const newPrice = parseFloat(cartProduct.totalPrice) + parseFloat(prod.price);
  const newQuantity = parseInt(cartProduct.quantity) + 1;

  const update = await Cart.findOneAndUpdate({_id}, {totalPrice: newPrice, quantity: newQuantity}, {new: true})

  if(update) {
      return res.status(200).json({
          success: true,
          message: "Product Quantity Increased!"
      })
  } else {
      return next(new ErrorHandler("Not updated!", 400))
  }
}

export const reduceQuantity = async(req,res,next)=>{
  const _id = req.params.id;

  const cartProduct = await Cart.findOne({_id})

  if(cartProduct.quantity <= 1) return next(new ErrorHandler("Quantity cannot be reduced more than 1!", 400))
  
  const productId = cartProduct.productId
  const prod = await Product.findOne({_id: productId})
  
  const newPrice = parseFloat(cartProduct.totalPrice) - parseFloat(prod.price);
  const newQuantity = parseInt(cartProduct.quantity) - 1;

  const update = await Cart.findOneAndUpdate({_id}, {totalPrice: newPrice, quantity: newQuantity}, {new: true})
  
  if(update) {
      return res.status(200).json({
          success: true,
          message: "Product Quantity Reduced!"
      })
  } else { 
      return next(new ErrorHandler("Not updated!", 400))
  }
}

export const removeCartItem = async(req,res,next)=>{
  const _id = req.params.id;

  const remove = await Cart.deleteOne({_id})

  if(remove) return res.status(200).json({
      success: true,
      message: "Item removed successfully!"
  })
  else {
      return next(new ErrorHandler("Not removed!", 400))
  }
}