const express = require('express')
// var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({
    dest:'src/images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG)$/)){
            return cb(new Error('Please Upload jpg image'))
        }
        cb(undefined,true);
    }
});
require('./db/mongoose')
const useRouter = require('./router/user-router')
const taskRout = require('./router/task-router')

const app = express()


const port = process.env.PORT || 3000;


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE");
    next();
})

app.use(express.json());
app.use(useRouter)
app.use(taskRout);

app.post('/upload', upload.single('uploadFile'), (req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
app.use(upload.array()); 





app.listen(port,()=>{
    console.log("connected")
})