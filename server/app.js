const express = require('express');
const fs = require('fs');
const cors = require('cors');

let data;//has the info about all the pokemon.
const file = fs.promises.readFile('./server/pokemon.json', {encoding: 'utf-8'});
file.then((res) => {
    data = JSON.parse(res);
})
.catch((err) => {
    console.log(err);
})


app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('This is the main page. Try other pages.');
})

//This is to get the data from database.
let i = 1;
app.get('/search/:name', (req, res) => {
    console.log("i++");
    data.forEach((pokemon) => {
        if(pokemon.name === req.params.name.toLowerCase()) {
            res.send(pokemon);
        }
    });
})

//This is for serach suggestion.
app.get('/suggest/', (req, res) => {
    res.send([]);
})

app.get('/suggest/:name', (req, res) => {
    let response = [];
    let noOfResponse = 0;
    for(let pokemon of data) {
        if(pokemon.name.startsWith(req.params.name.toLowerCase())) {
            response.push({name: pokemon.name});
            noOfResponse++;
        }
        if(noOfResponse > 9) {
            break;
        }
    }
    if(noOfResponse < 10) {
        for(let pokemon of data) {
            if(pokemon.name.includes(req.params.name.toLowerCase()) && !pokemon.name.startsWith(req.params.name.toLowerCase())) {
                response.push({name: pokemon.name});
                noOfResponse++;
            }
            if(noOfResponse > 9) {
                break;
            }
        }
    }
    res.send(response);
})

//starting server.
app.listen(3000, () => {
    console.log("Server is on...");
});


