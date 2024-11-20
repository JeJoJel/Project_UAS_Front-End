const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb+srv://jocelyn535230046:12345jejojel@cluster0.njnhv2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

connect();

app.listen(8000, () => {
    console.log("Server started on port 8000");
});

