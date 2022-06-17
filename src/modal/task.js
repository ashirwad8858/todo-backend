const mongoose = require('mongoose')
// ghg

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    completed:{
        type:Number,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const task = mongoose.model('Task',taskSchema)

module.exports = task