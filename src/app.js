require("dotenv").config();
const express = require("express");
const path = require("path");
const projectPath = path.resolve(__dirname, "..");
const app = express();
const passport = require("passport");
const { pugCompile } = require("../modules/pug");

const Routes = require("../modules/Routes");
const TransportTypes = require("../modules/editor/editor_transport/TransportType");
const EndPoints = require("../modules/editor/editor_endpoints/EndPoints");

const InitUsersEditor = require("../modules/editor/editor_users/router");
const InitEndPointsEditor = require("../modules/editor/editor_endpoints/router");
const InitTransportEditor = require("../modules/editor/editor_transport/router");
const InitRoutesEditor = require("../modules/editor/editor_routes/router");
const InitOrderTicket = require("../modules/order_ticket/router");
const InitAuthentification = require("../modules/auth/router");

app.use(express.json());

app.use(
  "/static",
  express.static(path.resolve(projectPath, "template", "public", "static"))
);

app.get("/", (req, res) => {
  res.send(pugCompile(path.resolve(projectPath, "template", "index.pug")));
});

//Инициализация роутеров
InitUsersEditor(app);
InitEndPointsEditor(app);
InitTransportEditor(app);
InitOrderTicket(app);
InitRoutesEditor(app);
InitAuthentification(app);

app.listen(3000, () => {
  console.log("Started!");
});
