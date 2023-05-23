const express =require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routers");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const URI = process.env.MONGO_URL;

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to the mongo db");
  }
);
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});