const {User,Follow} = require('../models')

exports.follow = async(req,res) => {
    const followedId = Number(req.params.id);
    const followerId = Number(req.id);
    
    try{
        const follow = await Follow.create({followedId,followerId})
        res.status(200).json(follow)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}