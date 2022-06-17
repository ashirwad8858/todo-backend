const jwt = require('jsonwebtoken')
const user = require('../modal/user')


const auth = async(req,res,next)=>{

    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,'mytoken')
        console.log(decode);
        const u = await user.findOne({_id:decode._id, 'tokens.token':token})

        if(!u){
            throw new Error()
        }
        req.user = u
        req.token = token
        next()
    } catch (e) {
        res.status(401).send('Please authenticate')
    }

}

module.exports = auth