import { Schema, model } from 'mongoose'; 

const cartSchema = new Schema({
    userId:{
        type:String,
        required:true,
        index:true,
    },
    productId:{
        type:Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref: 'Product'
    },
    quantity:{
        type:String,
        required:true,
    },
    totalPrice:{
        type:String,
        required:true,
    },
}, {timestamps: true});

const Cart = model('Cart', cartSchema);

export default Cart