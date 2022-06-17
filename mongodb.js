const mongodb = require('mongodb');
// const { MongoClient } = require("mongodb");
const mongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId

const connectionUrl = 'mongodb://127.0.0.1:27017'

const dbname = 'task-manager'

mongoClient.connect(connectionUrl,{ useNewUrlParser:true }, (error,client)=>{
    if(error){
        return console.log("Unable to connect")
    }

    console.log("connect");
    const db = client.db(dbname)
    // db.collection('users').insertOne({
    //     name:'Ashirwad',
    //     age:'26'
    // },(error,result)=>{
    //     if(error){
    //         return console.log("Unble to insert")
    //     }

    //     console.log(result);
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description:'first task',
    //         completed:false
    //     },{
    //         description:'this is second task',
    //         completed:true
    //     }
    // ],(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert many task')
    //     }
    //     console.log(result);
    // })
    // db.collection('users').findOne({name:'Ashirwad'},(error,result)=>{
    //     if(error){
    //         return console.log('Unable to finde')
    //     }
    //     console.log(result)
    // })

    // db.collection('users').findOne({_id: new ObjectId("623d9551944ef1c4459c9c43")},(error,result)=>{
    //     if(error){
    //         return console.log('Unable to finde')
    //     }
    //     console.log(result)
    // })

    // db.collection('users').find({age:'26'}).toArray((error,users)=>{
    //     console.log(users)
    // })

    // const cursor = db.collection('users').find({age:'26'}).count((error,res)=>{
    //     console.log(res);
    // })
    db.collection('users').updateOne({_id: new ObjectId("623d953aec1796a163a6e96d")},
                                    { $set:{ age:25}, }        
    ).then((result)=>{console.log(result)}).catch((error)=>{
        console.log(error);
    })
    // console.log(cursor.count().then(

    // ))

})
// const uri =
//   "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";
// // Create a new MongoClient
// const client = new MongoClient(uri);
// client.connect

// const { MongoClient } = require("mongodb");
// // Connection URI
// const uri =
//   "mongodb://127.0.0.1:27017";
// // Create a new MongoClient
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("task-manager").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);