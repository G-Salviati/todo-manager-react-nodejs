require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const todoRoutes = require("./routes/todoRoutes")

const app = express();
const port = process.env.PORT;

async function connectToMongoose() {
    await mongoose.connect(process.env.MONGO_URI);
}

connectToMongoose()
    .then(() => {
        console.log("Connection established with mongoose!");
    })
    .catch((error) => {
        console.error(`Couldn't connect to mongoose, error: ${error}`);
    });

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use(process.env.BASE_PATH + "/todos", todoRoutes)

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})