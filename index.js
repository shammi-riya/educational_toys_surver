const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.DB_PASS}@cluster0.f4myxpg.mongodb.net/?retryWrites=true&w=majority`;

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





// implement tabe

    app.get("/allToy/:tab", async (req, res) => {
      const tab = req.params.tab;

      // Define the query based on the selected tab
      const query = tab !== "All" ? { catogory: tab } : {};

      try {
        const toys = await productCollection.find(query).toArray();
        res.json(toys);
      } catch (error) {
        console.error("Error fetching toys:", error);
        res.status(500).json({ error: "Failed to fetch toys" });
      }
    });

    // ...


// post toy
    app.post("/postToy", async (req, res) => {
      const body = req.body;
      const result = await productCollection.insertOne(body);
      res.send(result)

    })



// get all toy

    app.get("/allToy", async (req, res) => {
      console.log(req.query.email);
      let query = {}
      if (req.query?.email) {
        query = { Useremail: req.query.email }
      }
      const result = await productCollection.find(query).toArray();
      res.send(result)



    })



    // delete toy
    app.delete("/allToy/:id", async (req, res) => {
      const id = req.params.id;
      const quiry = { _id: new ObjectId(id) }
      const product = await productCollection.deleteOne(quiry);
      console.log(product);
      res.send(product)
    })




   
// find specifik toys


    app.get("/toys/:id", async (req, res) => {
      const id = req.params.id;
      const quiry = { _id: new ObjectId(id) }
      const result = await productCollection.findOne(quiry)
      res.send(result);

    })



 // find search feild
    app.get("/seacrh/:text", async (req, res) => {
      try {
        const text = req.params.text;
        console.log(text);
        
        const result = await productCollection.find({
          toyName: { $regex: text, $options: "i" }
        })
        .limit(20)
        .toArray();
    
        res.send(result);
      } catch (error) {
        console.error("Error occurred during search:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    



// edit toys
    app.put("/toys/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      console.log(id);
      const filter = { _id: new ObjectId(id) }
      const updated = req.body;
      console.log(updated);
      const updateDoc = {

        $set: {
          catogory: updated.catogory,
          quintity: updated.quintity,
          price: updated.price,
          toyName:updated.toyName,
          catogory:updated.catogory,
          image:updated.image


        }
      }
      const result = await productCollection.updateOne(filter, updateDoc);
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
  res.send('education learming')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})