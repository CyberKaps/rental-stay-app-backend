const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8080
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

app.listen(PORT, () => {
    console.log(`Server is listening on ${8080}`);
})