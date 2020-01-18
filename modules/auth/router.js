module.exports = app => {
  const path = require("path");
  const projectPath = path.resolve(__dirname, "..");
  const { pugCompile } = require("../pug");
  const Users = require("../Users");
  app.get("/auth", async (req, res) => {
    res.send(pugCompile(path.resolve(projectPath, "auth", "auth.pug"), {}));
  });

  app.post("/auth", async (req, res) => {
    const data = req.body;
    let users = await new Users().getAllItems();
    let income = data.user;
    let user;
    users.forEach(val => {
      if (income.login == val.login && income.password == val.password) {
        user = val;
      }
    });
    if (!req.session.auth) {
      //req.session.cookie.user = user;
      req.session.auth = true;
    }
    console.log(req.session);
    res.send({ login: user ? true : false });
  });
};
