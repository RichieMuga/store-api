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
        type:String,
        default:[false,'Kindly provide a name']
        },
    price:{
        type:Number,
        require:[true,'Kindly provide a price']
        },
    createdAt:{
        type:Date,
        default:Date.now()
        },
    companies:{
        type:String,
        enum:{
            values:['ikea,caressa,liddy,marcos'],
            message:'{VALUES} is not supported'
        }
    }
})

module.exports=mongoose.model('Product',productsSchema)