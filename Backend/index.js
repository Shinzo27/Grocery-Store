import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import userRouter from './Routes/Users.js'
import productRouter from './Routes/Products.js'
import cartRouter from './Routes/Cart.js'
import checkoutRouter from './Routes/Order.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'
import ErrorHandler, { errorMiddleware } from './Middleware/ErrorHandler.js'
import { checkForAuthentication } from './Utils/Auth.js'
import categoryRouter from './Routes/Category.js'
import cors from 'cors'
import Razorpay from 'razorpay'
import { Server } from 'socket.io'
import http from 'http'
import Product from './Models/Products.js'
import Cart from './Models/Cart.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    },
})

const PORT = process.env.PORT || 8000
config({path: './config/.env'})

mongoose.connect(process.env.MONGO_URI, console.log("MongoDB Connected"))

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(checkForAuthentication('CustomerToken'))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)

app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/checkout', checkoutRouter)

app.get('/', (req,res)=>{
    res.send("Hello World")
})

io.on('connection', (socket, next) => {
    //increase quantity
    socket.on('updateSingleProductQuantity', async (data) => {
        const { _id } = data;
    
        const cartProduct = await Cart.findOne({_id})
        const productId = cartProduct.productId
        const prod = await Product.findOne({_id: productId})

        const newPrice = parseFloat(cartProduct.totalPrice) + parseFloat(prod.price);
        const newQuantity = parseInt(cartProduct.quantity) + 1;

        const update = await Cart.findOneAndUpdate({_id}, {totalPrice: newPrice, quantity: newQuantity}, {new: true})
        console.log(update)
        socket.emit('singleProductUpdated', {
            update: [update]
        }) 
    });
    //decrease quantity
    socket.on('decreaseSingleProductQuantity', async (data) => {
        const { _id } = data;
    
        const cartProduct = await Cart.findOne({_id})
        const productId = cartProduct.productId
        const prod = await Product.findOne({_id: productId})

        const newPrice = parseFloat(cartProduct.totalPrice) - parseFloat(prod.price);
        const newQuantity = parseInt(cartProduct.quantity) - 1;

        const update = await Cart.findOneAndUpdate({_id}, {totalPrice: newPrice, quantity: newQuantity}, {new: true})

        socket.emit('singleProductUpdated', {
            update: [update]
        })
    });
    //delete product from cart
    socket.on('deleteSingleProduct', async (data) => {
        const { _id } = data;
    
        const update = await Cart.findOneAndDelete({_id})

        const cartItems = await Cart.find({}).populate(
            "productId",
            "imgUrl name price",
          );

        await socket.emit('cartUpdated', {
            cartItems: cartItems
        })
    });
});

app.use(errorMiddleware)

server.listen(PORT, ()=>{
    console.log("Server Started at Port: " + PORT);
})