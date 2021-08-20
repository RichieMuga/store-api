
const getAllproducts=async (req,res)=>{
 res.status(200).json({msg:'success'})}
const getAllproductsStatic=async (req,res)=>{
    res.status(200).json({msg:'success'})
}

module.exports={getAllproducts,getAllproductsStatic}