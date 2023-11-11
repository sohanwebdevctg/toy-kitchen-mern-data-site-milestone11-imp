const express = require("express")
const app = express()
const port = process.env.PORT || 5000



app.get('/', (req, res) => {
  res.send("this is server site")
})

app.listen(port, () => {
  console.log(`this is server site port ${port}`)
})