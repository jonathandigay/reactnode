const express = require("express");
const app = express();
const { dbconnect } = require("./db/db");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
// middleware

// production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "./client/build")));

  app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// database
dbconnect();

// routes
app.use("/", require("./routes/userroutes"));
// authenticatication

const PORT = process.env.PORT || 3001;
app.listen(PORT);
