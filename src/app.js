require("dotenv").config();
const express = require("express");
const path = require("path");
const projectPath = path.resolve(__dirname, "..");
const app = express();

const { pugCompile } = require("../modules/pug");
const RouteTypes = require("../modules/RouteTypes");
const Routes = require("../modules/Routes");
const EndPoints = require("../modules/EndPoints");
const InitUsersEditor = require("../modules/editor_users/router");

//app.use(express.json);

app.use(
  "/static",
  express.static(path.resolve(projectPath, "template", "public", "static"))
);

app.get("/", (req, res) => {
  //let dataPromise = load();
  let obj = pugCompile(path.resolve(projectPath, "template", "index.pug"));
  console.log(obj);
  res.send(obj);
});

app.get("/order", async (req, res) => {
  //let dataPromise = load();
  let routeTypes = await new RouteTypes().loadData();
  let endPoints = await new EndPoints().loadData();
  let startPoints = endPoints;

  let found = await new Routes().loadData();
  let obj = pugCompile(
    path.resolve(projectPath, "template", "order_ticket.pug"),
    {
      data: {
        startPoints,
        endPoints,
        routeTypes,
        found
      }
    }
  );
  res.send(obj);
});

InitUsersEditor(app);

app.listen(3000, () => {
  console.log("Started!");
});
/*
  startPoints: [
    { id: 1, name: "Moskow" },
    { id: 4, name: "Saint Peter's burg" }
  ],
  endPoints: [
    { id: 2, name: "Krasnoyarks" },
    { id: 3, name: "Novosibirsk" }
  ],
  */
