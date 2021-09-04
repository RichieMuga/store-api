const errorHandler=(err,req,res,next)=>{
    res.send('oops!,something went wrong,try again later')
    // console.log(err)
}

module.exports=errorHandler