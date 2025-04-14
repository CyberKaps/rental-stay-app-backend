const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8080
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate')
// import 'dotenv/config'
require('dotenv').config()


main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})
async function main() {
    await mongoose.connect(process.env.MONGO_URL) 
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")))


app.get("/", (req, res) => {
    res.send("hii i'm kalpesh")
})

//index route 
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", {allListings})
})

//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs")
})

//show route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing})
})


//create route
app.post("/listings",async (req,res) => {
    // let {title, description, image, price, location, country} = req.body;
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})

//Delete route
app.delete("/listings/:id", async (req,res) => {
    let {id} = req.params;
    let deleteedListing = await Listing.findByIdAndDelete(id);
    console.log(deleteedListing);
    res.redirect("/listings");
})

// app.get("/testListing",async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing"); 
// })

app.listen(PORT, () => {
    console.log(`Server is listening on ${8080}`);
})