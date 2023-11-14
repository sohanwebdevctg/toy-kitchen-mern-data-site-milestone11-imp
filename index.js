const express = require("express")
const app = express()
const cors = require("cors")
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
  res.send("this is server site")
})

// serverSetup start
const uri = `mongodb+srv://${process.env.APP_USER}:${process.env.APP_PASSWORD}@cluster0.hoynchx.mongodb.net/?retryWrites=true&w=majority`;

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

    // database table name list
    const galleryCollection = client.db("toyKitchen").collection("gallery");
    const featuresProductsCollection = client.db("toyKitchen").collection("featuresProducts");
    const shopByCategoryCollection = client.db("toyKitchen").collection("shopByCategory");

    //get gallery data
    app.get("/gallery", async (req, res) => {
      const cursor = await galleryCollection.find().toArray();
      res.send(cursor)
    })

    //get featuresProducts data
    app.get("/featuresProducts", async (req, res) => {
      const result = await featuresProductsCollection.find().toArray();
      res.send(result);
    })

    //get shopByCategory data
    app.get('/shopByCategory', async (req, res) => {
      const shopByCategory = await shopByCategoryCollection.find().toArray();
      res.send(shopByCategory);
    })

    //get shopCategoryDetails data
    app.get('/shopCategoryDetails/:id', async (req, res) => {
      const id = req.params.id;
      const idValue = {_id : new ObjectId(id)}
      const data = await shopByCategoryCollection.findOne(idValue);
      res.send(data);
    })

    //post gallery data
    app.post('/gallery', async (req, res) => {
      const gallery = await galleryCollection.insertMany();
      res.send(gallery)
    })

    //post featuresProducts data
    app.post('/featuresProducts', async (req, res) => {
      const featuresProducts = await featuresProductsCollection.insertMany();
      res.send(featuresProducts)
    })

    //post shopByCategory data
    app.post('/shopByCategory', async (req, res) => {
      const shopByCategory = await shopByCategoryCollection.insertMany();
      res.send(shopByCategory);
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

// serverSetup endd



app.listen(port, () => {
  console.log(`this is server site port ${port}`)
})


