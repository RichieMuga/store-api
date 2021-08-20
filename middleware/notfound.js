const notfound= (req,res)=>{
    res.status(400).send({msg:"page not found"})
}

module.exports=notfound