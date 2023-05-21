const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId, Long } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.USERR_DB}:${process.env.DBB_PASS}@cluster0.f4myxpg.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

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

    app.get("/myToys", async (req, res) => {
      console.log(req.query.email);
      let query = {}
      if (req.query?.email) {
        query = { Useremail: req.query.email }
      }

      const result = await productCollection.find(query).toArray();
      res.send(result)

    })
    app.get("/assending", async (req, res) => {
      console.log(req.query.email);
      let query = {}
      if (req.query?.email) {
        query = { Useremail:req.query.email }
      }

      const result = await productCollection.find(query).sort({ price: 1 }).toArray();
      res.send(result)

    })
    app.get("/desending", async (req, res) => {
      console.log(req.query.email);
      let query = {}
      if (req.query?.email) {
        query = { Useremail:req.query.email }
      }

      const result = await productCollection.find(query).sort({ price: -1 }).toArray();
      res.send(result)

    })








    app.get("/toysAll", async (req, res) => {
      const user = await productCollection.find().limit(20).toArray()
      res.send(user)
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


    app.get("/toysId/:id", async (req, res) => {
      const id = req.params.id;
      const quiry = { _id: new ObjectId(id) }
      const result = await productCollection.findOne(quiry)
      res.send(result);

    })
    app.get("/toysdetails/:id", async (req, res) => {
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
      const filter = { _id: new ObjectId(id) }
      const updated = req.body;
      console.log(updated);
      const updateDoc = {

        $set: {
          catogory: updated.catogory,
          quintity: updated.quintity,
          price: updated.price,
          toyName: updated.toyName,
          image: updated.image


        }
      }
      const result = await productCollection.updateOne(filter, updateDoc);
      res.send(result);
    })


    // asending and desending










    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

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