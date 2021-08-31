const mongoose= require('mongoose')
const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Kindly provide a name']
        },
    rating:{
        type:Number,
        default:4.5
        },
    featured:{
        type:Boolean,
        default:false
        },
    price:{
        type:Number,
        require:[true,'Kindly provide a price']
        },
    createdAt:{
        type:Date,
        default:Date.now()
        },
    company:{
        type:String,
        enum:{
            values:['ikea','caressa','liddy','marcos'],
            message:'{VALUE} is not supported'
        }
    }
})

module.exports=mongoose.model('Product',productsSchema)