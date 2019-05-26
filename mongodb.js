const {MongoClient, ObjectID} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dbname = 'task-manager';

MongoClient.connect(url, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect');
    }
    const db = client.db(dbname);
    // db.collection('users').insertOne({
    //     name: 'Gurmeet Singh',
    //     age: 20
    // })
    // db.collection('users').insertMany([{
    //     name: 'Ragveer Singh',
    //     age: 20
    // },{
    //     name: 'Akash',
    //     age: 20
    // }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert documents');
    //     }
    //     console.log(result.ops);
    // })
    // db.collection('tasks').insertMany([{
    //     description: 'Clean room',
    //     completed: false
    // },{
    //     description: 'Learn Node.js',
    //     completed: false
    // }
    // ], (error, result) => {
    //     if(error){
    //         console.log('Unable to insert');
    //     }
    //     console.log(result.ops);
    // })

    db.collection('tasks').find({completed: false}).toArray((error, result) => {
        console.log(result);
    })

    db.collection('users').findOne({_id : ObjectID('5ce8d9dd5da86639ef37e643')}, (error, result) => {
        console.log(result);
    })
})