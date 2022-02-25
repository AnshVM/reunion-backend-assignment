const {User} = require('../models')
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    const {username,email,password} = req.body;

    try{
        const user = await User.create({username,email,password})
        return res.json(user)
    }catch(err){
        console.log(err)
        return res.status(201).json(err)
    }

}

exports.authenticate = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({
            where:{email,password}
        })

        if(!user) return res.status(500).json("Wrong email or password")

        const {id,username} = user
        const payload = {id,username}
        const token = jwt.sign(payload,process.env.SECRET_KEY)
        
        return res.status(200).json(token)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.getUser = async(req,res)=>{
    const id = req.id
    try{
        const user = await User.findOne({
            where:{id}
        })
        const {username,followers,following} = user
        res.status(200).json({username,followers,following})
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}

exports.getAllUserPosts = async(req,res) => {
    const userId = req.id

    try{

    }catch(err){
        console.log(err)
        return res.json(err)
    }
}