require('dotenv').config()
require('express-async-errors')
const { json } = require('express')
//async errors

const express=require('express')
const app=express()
const errorHandler= require('./middleware/errorhandler')
const notfound= require('./middleware/notfound')
const port=process.env.PORT || 3000
const connectdb=require('./db/dbconnect')
const productsrouter= require('./routes/products')

//json parser
app.use(express.json())


app.get('/',(req,res)=>{
    res.send(`<h1>Home</h1><a href='/api/v1/products'>products</a>`)
})

app.use('/api/v1/products',productsrouter)

app.use(notfound)
app.use(errorHandler)

const start=async ()=>{
    try {
        //connect to db
        await connectdb(process.env.MONGO_URI)
        app.listen(port, console.log(`listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()