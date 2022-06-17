const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex:true
})



// const newUser = new user({
//     name:'abhi',
//     password:'12457864Ashirwpassword',
//     email:'ashi@gmail.com',
//     age:27
// })

// newUser.save().then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err);
// })

// const newTask = new task({
//     description:'This is frist description',
//     completed:true
// })

// newTask.save().then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })