require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/db");

app.use(require("./controllers")(db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`server up at port ${process.env.PORT}`)
})