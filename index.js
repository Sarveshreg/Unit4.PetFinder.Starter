// import the pets array from data.js
const pets = require('./data');
const path=require("path");
// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
// create a homepage in the frontend folder and serve it
// app.get('/', (req, res) => {
//     // serve up the public folder as static index.html file
//     res.sendFile(path.join(__dirname,"../Frontend/vite-project/src/main.jsx"))
// });
app.use(express.static("dist"));

app.get('/api', (req, res) => {
    res.send('Hello World!');
    console.log("Pets",pets)
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets)
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    let owner=req.query.name
   

    // find the pet in the pets array
    const pet = pets.filter(pet => pet.owner === owner);
    res.send(pet);

    // send the pet as a response

});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    let name=req.params.name;
    console.log(name);

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);
    res.send(pet);
    // send the pet as a response

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;