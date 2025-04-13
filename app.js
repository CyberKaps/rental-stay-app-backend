const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8080
const Listing = require("./models/listing.js")
// import 'dotenv/config'
require('dotenv').config()

main()
    .then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(process.env.MONGO_URL) 
}



app.get("/", (req, res) => {
    res.send("hii i'm kalpesh")
})

app.get("/testListing",async (req, res) => {
    let sampleListing = new Listing({
        title: "My new villa",
        description: "By the beach",
        price: 1200,
        location: "Calangute, goa",
        country: "India"
    });

    await sampleListing.save();
    console.log("sample was saved");
    res.send("successful testing"); 
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${8080}`);
})