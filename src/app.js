require("dotenv").config();
const express = require("express");
const path = require("path");
const projectPath = path.resolve(__dirname, "..");
const app = express();

const { pugCompile } = require("../modules/pug");
const RouteTypes = require("../modules/RouteTypes");
const Routes = require("../modules/Routes");
const EndPoints = require("../modules/editor_endpoints/EndPoints");
const InitUsersEditor = require("../modules/editor_users/router");
const InitEndPointsEditor = require("../modules/editor_endpoints/router");

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

//меню заказа билетов
app.get("/order", async (req, res) => {
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

//Инициализация роутеров
InitUsersEditor(app);
InitEndPointsEditor(app);

app.listen(3000, () => {
  console.log("Started!");
});
