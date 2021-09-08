const Products=require('../model/products')
//impo
const getAllproducts=async (req,res)=>{
    const {featured,company,name,sort,fields,numericFilters}=req.query
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
    if(numericFilters){
        const operatorMap={
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq',
            '>':'$gt',
            '>=':'$gte'
        }
        const regEx=/\b(<|>|<=|>=|=)\b/g
        //dynamic javascript object
        let filters= numericFilters.replace(regEx,(match)=>`-${operatorMap[match]}-`)
        const options= ['price','rating']
        filters=filters.split(',').forEach((item)=>{
            const[fields,operator,value]=item.split('-')
            if(options.includes(fields)){
                queryObject[fields]={[operator]:Number(value)}
            }
                }
            )
        console.log(filters)
    }
    console.log(queryObject)
    let result= Products.find(queryObject)
    //sort
    if(sort){
        const sortProducts=sort.split(',').join(' ')
        result=result.sort(sortProducts)
    } 
    else{
        result=result.sort('createdAt')
    }
//select what to show eg.name only
     if(fields){
        const fieldProducts=fields.split(',').join(' ') 
        result.select(fieldProducts)
    }
//pagination
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 10

    await result.limit(limit).skip(page-1)
    const products= await result
    res.status(200).json({products,nbHits:products.length}) 
}
//


const getAllproductsStatic=async (req,res)=>{
    const products= await Products.find({price:{$gt: 30}}).sort('price').limit(15).skip(0)
    res.status(200).json({products,nbHits:products.length})
}

module.exports={getAllproducts,getAllproductsStatic}