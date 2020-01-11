require("dotenv").config();
const {pugCompile} = require("../modules/pug");
const express = require("express");
const path = require("path");
const projectPath = path.resolve(__dirname, "..");
const app = express();
const Cars = require("../modules/Cars");

//app.use(express.json);



const load = () => {
    let db = new Cars();
    let data = db.cloneCars();
    console.log("loaded " + data);
    return data;
}

app.get("/index", (req, res) => {
    let dataPromise = load();
    dataPromise.then((incomeCars) => {
        res.send(        
            pugCompile(path.resolve(projectPath, "template", "index.pug"), {
                grg: "Hello world!",
                cars: incomeCars
              })
        );
    })
});



app.listen(3000, () => {
    console.log("Started!");
});