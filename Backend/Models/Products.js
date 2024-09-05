import { Schema, model } from 'mongoose';
import { string } from 'zod';

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    imgUrl:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Product = model('Product', productSchema);

export default Product