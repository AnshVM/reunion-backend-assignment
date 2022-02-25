const jwt = require('jsonwebtoken')
exports.auth = (req,res,next)=>{
    if(!req.headers.authorization) return res.status(401).json('Invalid token')
    const token = req.headers.authorization
    jwt.verify(token,process.env.SECRET_KEY,(err,result)=>{
        if(err) res.status(401).json("Invalid token")
        req.username = result.username
        req.id = result.id
        next()
    })
}