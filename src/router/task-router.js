const express = require('express');
const taskrouter = new express.Router()
const Task = require('../modal/task');
const auth = require('../middleware/auth')



taskrouter.delete('/tasks/:id',  async (req, res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        console.log(e);
    }
})
taskrouter.post('/tasks', auth,async (req,res)=>{
    
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    try {
        // const task = new Task(req.body);
        
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
        
    }
    // const task = new Task(req.body);
    // task.save().then(()=>{
    //     res.status(200).send(task)
    // }).catch((e)=>{
    //     res.status(400).send(e)
    // })
})

taskrouter.patch('/tasks/:id', auth, async(req,res)=>{
    const update = Object.keys(req.body);
    const allowed = ['description','completed'];
    const isValid = update.every((key)=>{
        return allowed.includes(key)
    })
    if(!isValid){
        return res.status(400).send({error:"Invalid request"})
    }

    
    try {
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
       


        // const task = await Task.findByIdAndUpdate(req.params.id, req.body,{ new:true, runValidadators:true})
        if(!task){
            return res.status(400).send()
        }
        update.forEach((field)=>{
            task[field] = req.body[field]
        })

        task.save();
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e);
    }
})


taskrouter.get('/tasks',auth, async(req,res)=>{

    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    try {
        // const task = await Task.find({owner:req.user._id})
        // const task = await req.user.populate('tasks').execPopulate()
        const task = await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip)
            }
        }).execPopulate()
        res.send(req.user.tasks)
        
        // res.send(task)
    } catch (error) {
        res.send(error)
    }
})

// Admin
taskrouter.get('/tasksAll',async (req,res)=>{

    try {
        const task = await Task.find({})
        res.send(task)
    } catch (e) {
        res.send(e)
    }
    // Task.find({}).then((task)=>{
    //     res.send(task)
    // }).catch((e)=>{
    //     res.send(e);
    // })
})

taskrouter.get('/tasks/:id',auth, async (req,res)=>{
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner:req.user._id})  
        console.log(task);
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e);
    }
    // Task.findById(_id).then((task)=>{
    //     res.status(200).send(task)
    // }).catch((e)=>{
    //     res.status(500).send(e);
    // })
})

module.exports = taskrouter