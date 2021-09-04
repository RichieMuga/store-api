const Products=require('../model/products')

const getAllproducts=async (req,res)=>{
    const {featured,company,name,sort,fields}=req.query
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
    console.log(queryObject)
    let result= Products.find(queryObject)
    //sort
    if(sort){
        const sortProducts=sort.split(',').sort.join(' ')
        result=result.sort(sortProducts)
    }
    else{
        result=result.sort('createdAt')
    }
//select what to show eg.name only
     if(fields){
        const fieldProducts=fields.split(',').fields.join(' ') 
        result.select(fieldProducts)
    }
    const products= await result
    res.status(200).json({products,nbHits:products.length}) 
}


const getAllproductsStatic=async (req,res)=>{
    const products= await Products.find().limit(10).sort('price')
    res.status(200).json({products,nbHits:products.length})
}

module.exports={getAllproducts,getAllproductsStatic}