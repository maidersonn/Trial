require("dotenv").config();
const express = require("express");
var cors = require('cors')
const app = express();
const db = require("./config/db");

app.use(cors())
app.use(express.json());

app.use(require("./controllers")(db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`server up at port ${process.env.PORT}`)
})