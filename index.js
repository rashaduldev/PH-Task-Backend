const express = require('express')
const cors = require('cors')
const app = express()
const port=process.env.PORT || 3000

// middleware
app.use(cors());
app.use(express.json());
// username: mdrashadul898
// password: AYrD9M1mFDQuQbxT 


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mdrashadul898:AYrD9M1mFDQuQbxT@cluster0.hq3qxum.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const usercollection = client.db("AllTask").collection("users");
    const taskscollection = client.db("AllTask").collection("tasks");

    // get user information 
    app.get('/users', async(req,res)=>{
      const result=await usercollection.find().toArray();
      res.send(result);
    })
    // get task information 
   app.get('/tasks',async(req,res)=>{
    const result=await taskscollection.find().toArray();
    res.send(result);
   })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})