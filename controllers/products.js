
const Products=require('../model/products')

const getAllproducts=async (req,res)=>{
    const {featured,company,name}=req.query
    const queryObject={}
    if(featured){
       queryObject.featured=featured==='true'?true:false;
    }
    if(company){
        queryObject.company= company
    }
    if(name){
        queryObject.name={ $regex: name ,$options:'i'}
    }
    const products= await Products.find(queryObject)
    res.status(200).json({products,nbHits:products.length}) 
    
}


const getAllproductsStatic=async (req,res)=>{
    console.log(req.query)
    const products= await Products.find().sort('name')
    res.status(200).json({products,msg:'success'})
}

module.exports={getAllproducts,getAllproductsStatic}