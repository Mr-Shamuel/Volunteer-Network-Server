 
const express = require('express');
const app = express()
const cors = require('cors');
const bodyparser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 4000;
app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.send('volenteer connected')
})

//database connection part 

const { MongoClient, ServerApiVersion } = require('mongodb');
 

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.9v7jf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const Eventscollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION);
 
  // perform actions on the collection object

 
 app.get('/events', (req, res) => {
  Eventscollection.find()
  .toArray((err,items)=>{
    console.log("data",items);
    res.send(items);
  })

 })


 app.post('/addEvents',(req, res) => {
  const newEvents =req.body;
  Eventscollection.insertOne(newEvents)
  .then(result=>{
    console.log("insertedCount",result.insertedCount);
    res.send(result.insertedCount > 0)
  })
 })

  // client.close();
});
app.listen(port, () => {
 console.log("database working!!");
})
