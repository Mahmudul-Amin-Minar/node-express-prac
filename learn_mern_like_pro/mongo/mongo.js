const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// const dbName = 'student';

const insertStudent = async(db, document) => {
    const collection = db.collection("students");
    const result = await collection.insertOne(document);
    console.log(result);
}

const searchStudent = async (db, document) => {
    const collection = db.collection("students");
    const result = await collection.findOne(document);
    console.log(result);
}

const student = {
    name: 'minar',
    age: 15,
    city: 'new york'
}

const main = async() => {
    try{
        await client.connect();
        console.log("connected to mongodb");
        const db = client.db('schooldb');
        // const result = await insertStudent(db, student);
        // const result = await searchStudent(db, student);
        const result = await searchStudent(db, { age: { $gt: 30 }});
        console.log(result);
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}

main();

// async function main(){
//     await client.connect();
//     console.log('connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('documents');

//     return 'done..';
// }

// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());