const fs = require('fs');

let json = "";

fs.readdir("./pokemon", (err, files) => {
    files.forEach((file, index) => {
        if(index === files.length - 1) {
            json += `\t{"name": "${file.toLowerCase().slice(0, file.length - 4)}"}\n`;
        }
        else {
            json += `\t{"name": "${file.toLowerCase().slice(0, file.length - 4)}"},\n`;
        }
    })
    fs.writeFile("./pokemon.json", `[${json}]`, (err) => {
        if(err) {
            return console.log(err);
        }
    });
    // console.log(json);
})



