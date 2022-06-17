const express = require('express');
const router = new express.Router();
const User = require('../modal/user');
const auth = require('../middleware/auth')


router.post('/users',async (req,res)=>{

    const user = new User(req.body);

    try{
        await user.save()
        const token = await user.generateToken();

        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e);
    }

    // console.log(req.body)
    // user.save().then(()=>{
    //     res.status(200).send(user)
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })

})
// router.post('/users/login',(req,res)=>{
//     console.log(req.body);
// })
router.post('/users/login', async (req,res)=>{
    console.log(req.body)
    try {
        const user = await User.findByCredential(req.body.email,req.body.password);
        const token = await user.generateToken()
        console.log("getdata",user)
        res.send({ user,token});
    } catch (e) {
        res.status(404).send();
    }
})


router.patch('/users/me', auth,async (req,res)=>{

    const update = Object.keys(req.body)
    const allowed = ['name','email','password','age']
     const isValid = update.every((ele)=>{
        return allowed.includes(ele)
     })
// 
     console.log(isValid);

     if(!isValid){
         res.status(400).send({error:'Invalid updates'})
     }
    try {
        // const user = await User.findById(req.params.id);
        update.forEach((ele)=>[
            req.user[ele] = req.body[ele]
        ])

        await req.user.save();

    //    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidadators:true})
       
       res.send(req.user)
    } catch (e) {
        res.status(400).send(e);
    }
} )



//Admin
router.patch('/users/:id', async (req,res)=>{

    const update = Object.keys(req.body)
    const allowed = ['name','password','age']
     const isValid = update.every((key)=>{
         return allowed.includes(key)
     })

     console.log(update);

     if(!isValid){
         res.status(400).send({error:'Invalid updates'})
     }
    try {
        const user = await User.findById(req.params.id);
        update.forEach((ele)=>[
            user[ele] = req.body[ele]
        ])

        await user.save();

    //    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidadators:true})
       if(!user){
           return res.status(404).send()
       }
       res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e);
    }
} )


router.delete('/users/me',auth,async(req,res)=>{
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.send(500).send();
    }
})

//Admin
router.delete('/users/:id', async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return    res.status(400).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e);
        
    }
})

router.post('/users/logout',auth, async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })

        await req.user.save()
        res.send("logedout")
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/users/logoutAll', auth, async(req,res)=>{
    try {
        req.user.tokens = []
        await req.user.save();
        res.send("all logout")
    } catch (e) {
        res.send(e)
    }
})
router.get('/users/me',auth, async (req,res)=>{
    res.send(req.user);
    
    
    // User.find({}).then((user)=>{
    //     res.status(200).send(user)
    // }).catch((e)=>{
    //     res.send(e);
    // })
})

// getting all user (Admin purpose)
router.get('/users', async(req,res)=>{
    try {
    const user = await User.find({})
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e);
    }

})

// Admin purpose
router.get('/users/:id',async (req,res)=>{

    const _id = req.params.id
    try {
    const user = await User.findById(_id)
    if(!user){
                return res.status(200).send()
            }
        res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
        
    }


    // User.findById(_id).then((user)=>{

    //     if(!user){
    //     res.status(500).send(e)
    //         return res.status(200).send()
    //     }

    //     res.status(200).send(user)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })

})

module.exports = router