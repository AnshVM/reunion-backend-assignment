const {Post,User,Like,Comment} = require('../models')

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
        if(post.userId!==Number(req.id)) return res.json("This user is not authenticated to delete this post")
        await post.destroy()
        res.json("Post deleted")
    }catch(err){
        console.log(err)
        res.json(err)
    }
}

exports.addComment = async(req,res)=>{
    const postId = Number(req.params.id)
    const userId = Number(req.id)

    try{
        const post = await Post.findOne({where:{id:postId}})
        if(!post) return res.json("Post not found")
        const user = await User.findOne({where:{id:userId}})
        if(!user) return res.json("User not found")
        const comment = await Comment.create({postId,userId,body:req.body.body})
        return res.json(comment.id)
    }catch(err){
        console.log(err)
        return res.json(err)
    }
}

exports.getPostById = async(req,res) => {
    const id = req.params.id
    
    try{
        const post = await Post.findOne({where:{id}})
        if(!post) return res.json("Post not found")
        const {title,body,likes} = post
        const comments = (await Comment.findAll({where:{postId:id}})).map((comment)=>comment.dataValues)
        return res.json({title,body,likes,comments:comments.length})

    }catch(err){
        console.log(err)
        res.json(err)
    }
}

exports.getAllUserPosts = async(req,res) => {
    const userId = req.id

    try{
        let postQuery = (await Post.findAll({where:{id:userId}})).map((post)=>post.dataValues)
        let posts=[]
        for(let i=0;i<postQuery.length;i++){
            const {id,title,body,created_at,likes} = postQuery[i]
            const comments = (await Comment.findAll({where:{postId:postQuery[i].id}})).map((comment)=>comment.dataValues)
            posts.push({id,title,desc:body,created_at,comments,likes})
        }
        console.log(posts)
        return res.json(posts)

    }catch(err){
        console.log(err)
        return res.json(err)
    }
}
