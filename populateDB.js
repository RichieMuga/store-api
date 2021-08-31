require('dotenv').config()
const connect= require('./db/dbconnect')
const productscontent= require('./products.json')
const Products= require('./model/products')

const start=async ()=>{
    try {
        await connect(process.env.MONGO_URI)
        await Products.deleteMany()
        await Products.create(productscontent);
        console.log("success!!")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()