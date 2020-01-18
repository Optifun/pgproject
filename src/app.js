require("dotenv").config();
const express = require("express");
const path = require("path");
const projectPath = path.resolve(__dirname, "..");
const app = express();
const Auth = require("../modules/auth/Auth");
// const session = require("express-session");
// const passport = require("passport");
const { pugCompile } = require("../modules/pug");

const Routes = require("../modules/Routes");
const TransportTypes = require("../modules/editor/editor_transport/TransportType");
const EndPoints = require("../modules/editor/editor_endpoints/EndPoints");

const Users = require("../modules/Users");
const InitUsersEditor = require("../modules/editor/editor_users/router");
const InitEndPointsEditor = require("../modules/editor/editor_endpoints/router");
const InitTransportEditor = require("../modules/editor/editor_transport/router");
const InitRoutesEditor = require("../modules/editor/editor_routes/router");
const InitOrderTicket = require("../modules/order_ticket/router");
const InitAuthentification = require("../modules/auth/router");
const cookkieParser = require("cookie-parser");
let users = [];
// let store = new session.MemoryStore();

app.set("trust proxy", 1);
app.use(express.json());
app.use(
  "/static",
  express.static(path.resolve(projectPath, "template", "public", "static"))
);

// app.use(
//   session({
//     cookie: { maxAge: 60 * 60 * 24 * 1000, sameSite: true },
//     saveUninitialized: false,
//     resave: false,
//     secret: "ticket service",
//     store: store
//   })
// );

// app.use(function(req, res, next) {
//   console.log("CHECK");
//   console.log(req.session);
//   console.log(req.sessionID);
//   console.log(store.sessions);
//   if (store.sessions[req.sessionID]) {
//     req.body.auth = JSON.parse(store.sessions[req.sessionID]).auth;
//     req.session.auth = req.body.auth;
//     console.log(`Succed ${req.body.auth}`);
//   } else req.body.auth = false;
//   next();
// });
app.use(cookkieParser());
const noAuthRequests = ["/auth", "/register"];
app.use((req, res, next) => {
  // proverka auth
  if (noAuthRequests.some(item => item === req.path)) {
    next();
    return;
  }
  const { token } = req.cookies;
  if (!token) {
    res.redirect("/auth");
    return;
  }
  const userData = Auth.checkToken(token);
  if (!userData) {
    res.redirect("/auth");
    return;
  }
  req.userData = userData;
  const newToken = Auth.updateOrCreateToken(userData);
  console.log("fwef gw");
  Auth.saveToken(res, newToken);
  next();
});
app.use((req, res, next) => {
  if (!req.userData) {
    next();
    return;
  }
  if (req.userData.perms < 5) {
    res.redirect("/");
  }
  next();
});

app.get("/", (req, res) => {
  console.log(req.body);
  res.send(pugCompile(path.resolve(projectPath, "template", "index.pug"), {}));
});

//Инициализация роутеров
InitAuthentification(app);
InitUsersEditor(app);
InitEndPointsEditor(app);
InitTransportEditor(app);
InitOrderTicket(app);
InitRoutesEditor(app);

app.listen(3000, () => {
  console.log("Started!");
});
