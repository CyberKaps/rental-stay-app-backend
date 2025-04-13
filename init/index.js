const mongoose = require('mongoose');
const initdata = require('./data.js');
const Listing = require("../models/listing.js");

require('dotenv').config()

main()
    .then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(process.env.MONGO_URL) 
}


const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initialized")
}

initDB();