const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
// const User = require('.')
const Task = require('./task')



const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Invalid email')
                }
            }
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minlength:7,
            validate(value){
                if(value.toLowerCase().includes('password')){
                    throw new Error('Passord not contain password')
                }
            }
        },
        age:{
            type:Number,
            default:0,
            validate(value){
                if(value<0){
                    throw new Error('Age is less than 0')
                }
            }
        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }]
    },{
        timestamps:true
    }
)
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})
userSchema.methods.toJSON = function(){
    const user= this
    // console.log("a",user)
    const userObject = user.toObject()

    // console.log("userobj: ",userObject)
    delete userObject.password;
    delete userObject.tokens

    // console.log(userObject)
    return userObject
}

userSchema.methods.generateToken = async function () {
    const user = this
    const token =  jsonwebtoken.sign({ _id:user._id.toString()},'mytoken')
    user.tokens = user.tokens.concat({token})
    user.save()
    return token
}

userSchema.statics.findByCredential = async (email,password)=>{

    const u = await user.findOne({email})
    if(!u){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,u.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return u

}


// save user and encrypt password
userSchema.pre('save',async function (next){

    const user = this
    console.log("just before save",user)
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})
const user = mongoose.model('User',userSchema)




module.exports = user