const {Post,User} = require('../models')

exports.createPost = async(req,res) => {
    const userId = req.id
    const {title,body} = req.body
    
    try{
        const post = await Post.create({title,body,userId})
        return res.json(post)
    }catch(err){
        console.log(err)
        res.json(err)
    }
}