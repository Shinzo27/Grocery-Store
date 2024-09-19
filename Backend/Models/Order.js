import { Schema, model } from 'mongoose';

var orderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    pincode: {
        type: String,
        required:true,
        length: 6
    },
    total: {
        type: String,
        required:true
    },
    products: [{
        name: String,
        quantity: String,
        price: String
    }],
    orderId: {
        type: String,
        required:true
    },
    status: {
        type: String,
        required:true,
        enum: ['pending', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

const Order = model('Order', orderSchema);

export default Order