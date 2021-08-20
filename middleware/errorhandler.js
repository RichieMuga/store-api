const errorHandler=(err,req,res,next)=>{
    res.send('oops!,something went wrong,try again later')
}

module.exports=errorHandler