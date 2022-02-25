const {User,Follow} = require('../models')

exports.follow = async(req,res) => {
    const followedId = Number(req.params.id);
    const followerId = Number(req.id);
    
    try{
        const follow = await Follow.create({followedId,followerId})
        const follower = await User.findOne({where:{id:followerId}})
        const followed = await User.findOne({where:{id:followedId}})
        follower.following++
        followed.followers++
        await follower.save()
        await followed.save()
        res.status(200).json({follow,follower,followed})
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}
