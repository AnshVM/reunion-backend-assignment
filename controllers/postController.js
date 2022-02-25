const {Post,User,Like} = require('../models')

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

exports.likePost = async(req,res)=>{
    const userId = req.id
    const postId = req.params.id

    try{
        const user = await User.findOne({where:{id:userId}})
        if(!user) return res.json("User not found")

        const post = await Post.findOne({where:{id:postId}})
        if(!post) return res.json("Post not found")
        post.likes++
        await post.save()

        const like = await Like.create({userId,postId})
        return res.json({like,user,post})

    }catch(err){
        console.log(err)
        res.json(err)
    }
}

exports.unlikePost = async(req,res)=>{
    const userId = req.id
    const postId = req.params.id

    try{

        const like = await Like.findOne({userId,postId})
        if(!like) return res.json("User has not liked this post")

        await like.destroy()

        const post = await Post.findOne({where:{id:postId}})
        post.likes--
        await post.save()

        return res.json(post)

    }catch(err){
        console.log(err)
        res.json(err)
    }
}

exports.deletePost = async(req,res) => {
    try{
        const post = await Post.findOne({where:{id:Number(req.params.id)}})
        console.log(post.userId)
        console.log(post)
        console.log(req.id)
        if(post.userId!==Number(req.id)) return res.json("This user is not authenticated to delete this post")
        await post.destroy()
        res.json("Post deleted")
    }catch(err){
        console.log(err)
        res.json(err)
    }
}

