const express = require("express");
const mongoose = require("mongoose");
const app = express();

const uri = "mongodb://jejojel:jejojel12345@clusteruas-shard-00-00.e0bga.mongodb.net:27017,clusteruas-shard-00-01.e0bga.mongodb.net:27017,clusteruas-shard-00-02.e0bga.mongodb.net:27017/?ssl=true&replicaSet=atlas-nf5n95-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ClusterUAS";

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

