const express = require('express')
const app = express()
const cors = require('cors');
// require('dotenv').config()
// educational-toys
// eWThzqzmyZyyqwiz
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://educational-toys:eWThzqzmyZyyqwiz@cluster0.f4myxpg.mongodb.net/?retryWrites=true&w=majority";

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

     const productCollection = client.db('educational-toys').collection('toys');


    

app.get("/allToy/:tab", async (req, res) => {
    const tab = req.params.tab;
  
    // Define the query based on the selected tab
    const query = tab !== "All" ? {catogory: tab } : {};
  
    try {
      const toys = await productCollection.find(query).toArray();
      res.json(toys);
    } catch (error) {
      console.error("Error fetching toys:", error);
      res.status(500).json({ error: "Failed to fetch toys" });
    }
  });
  
  // ...
  


app.post("/postToy",async(req,res)=>{
  const body = req.body;
  const result =await productCollection.insertOne(body);
  res.send(result)
  
})







      app.get("/allToy",async(req,res)=>{
        const query = await productCollection.find({}).toArray();
        res.send(query)
      })
   
   
app.get("/allToy/:email",async(req,res)=>{
  console.log(req.params.email);
  const quiry =await productCollection.find({Useremail:req.params.email}).toArray();
  res.send(quiry);
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
  res.send('education learming')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})